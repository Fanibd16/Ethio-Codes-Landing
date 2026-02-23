
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Class name merger utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Delay utility
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
