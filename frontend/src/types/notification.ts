export interface INotification {
    id:        string;
    title:     string;
    message:   string;
    type:      string;
    read:      boolean;
    tradeId:   string | null;
    clientId:  string;
    createdAt: Date;
    updatedAt: Date;
}
