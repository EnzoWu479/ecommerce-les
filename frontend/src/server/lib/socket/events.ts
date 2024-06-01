export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  ERROR: "error",
  NEW_CHECKLIST: "new-checklist",
  NEW_ITEM: "new-item[:checklist_id]",
  CHANGE_ITEM: "change-item[:checklist_id]",
} as const;
export type SOCKET_EVENTS = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
