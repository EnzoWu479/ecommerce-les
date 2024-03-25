'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { IMask } from '@/helpers/masks';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  mask?: IMask;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, mask, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
          error && 'border-red-600'
        )}
        onInput={(e: any) => {
          if (mask) {
            e.target.value = mask(e.target.value);
          }
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
