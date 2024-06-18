import { useState } from 'react';

interface Props {
  toggleOpen: () => void;
}

export const ChatAssistentTrigger = ({ toggleOpen }: Props) => {
  return (
    <button
      onClick={toggleOpen}
      className="h-12 w-80 rounded-t-md border bg-white px-4 py-2 text-start"
    >
      <span className="text-sm">Mundo Assistente IA</span>
    </button>
  );
};
