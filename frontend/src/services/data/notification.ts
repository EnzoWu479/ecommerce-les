import { api } from "@/lib/axios";
import { PageRequest } from "@/server/shared/PageRequest";
import { PageResponse } from "@/server/shared/PageResponse";
import { INotification } from "@/types/notification";

export const notificationData = {
    async list({page, limit}: PageRequest) {
        const {data} = await api.get<PageResponse<INotification>>("/api/notifications", {
            params: {
                page, 
                limit 
            }
        });
        return data;
    }
}