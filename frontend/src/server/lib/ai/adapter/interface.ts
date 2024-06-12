export interface AIAdapter {
  getReply: (message: string) => Promise<string>;
} 