import { useMutationChatAI } from '@/services/query/useMutationAi';
import { useChatStore } from '../store';

export const useChat = () => {
  const { messages, setMessages } = useChatStore();
  const { mutateAsync, isPending } = useMutationChatAI(messages);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return false;
    const newMessages = [...messages];
    newMessages.push({
      message,
      isUser: true
    });
    setMessages(newMessages);

    try {
      const response = await mutateAsync(message);
      newMessages.push({
        message: response.message,
        bookName: response.bookName,
        isUser: false
      });
      setMessages(newMessages);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return {
    messages,
    sendMessage,
    isPending
  };
};
