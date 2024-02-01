"use client";

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const GoBackButton = () => {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()}>
      <ArrowLeftCircle size={32} />
    </button>
  );
};
