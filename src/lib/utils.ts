import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = async (seconds: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, seconds * 1000);
  });
};
