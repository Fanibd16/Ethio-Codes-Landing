
/**
 * Class name merger utility
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Delay utility
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
