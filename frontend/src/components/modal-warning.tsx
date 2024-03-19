'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogClose
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

export interface ModalWarningProps {
  title?: ReactNode;
  description?: ReactNode;
  acceptButton?: ReactNode;
  onAccept?: () => Promise<boolean>;
}

export const ModalWarning = ({
  title,
  description,
  acceptButton,
  onAccept
}: ModalWarningProps) => {
  const handleAccept = async () => {
    if ((await onAccept?.()) || !onAccept) {
      // close modal
      dialogClose();
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="ghost">Voltar</Button>
          </DialogClose>
          <Button onClick={handleAccept}>{acceptButton}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
