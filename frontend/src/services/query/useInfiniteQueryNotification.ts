import { useInfiniteQuery } from "@tanstack/react-query"
import { notificationData } from "../data/notification"
import { PageResponse } from "@/server/shared/PageResponse"
import { useAuthStore } from "@/features/authentication/auth-store"

export const useInfiniteQueryNotification = () => {
    const {isAuthenticated} = useAuthStore();
    const query = useInfiniteQuery({
        queryKey: ["notification", isAuthenticated],
        enabled: !!isAuthenticated,
        queryFn: async ({pageParam}) => notificationData.list({
            page: pageParam,
            limit: 10,
        }),
        initialPageParam: 1,
        getNextPageParam: (next: PageResponse) => {
            if (next.page === next.totalPages) {
                return null;
            }
            return next.page + 1;
        },
        getPreviousPageParam: (previous: PageResponse) => {
            if (previous.page === 1) {
                return null;
            }
            return previous.page - 1;
        }
    });
    const alldata = query.data?.pages.map(
        (value) => value.content
    ).flat() || [];

    return {...query, data: alldata}
}