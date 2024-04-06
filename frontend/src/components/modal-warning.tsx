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
import { ReactNode, useState } from 'react';

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
  const [loading, setLoading] = useState(false);
  const handleAccept = async () => {
    setLoading(true);
    try {
      if ((await onAccept?.()) || !onAccept) {
        // close modal
        dialogClose();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger data-test="delete-button">
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
          <Button
            onClick={handleAccept}
            disabled={loading}
            data-test="confirm-delete-button"
          >
            {acceptButton}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
