import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//use to store amount on miliunit to support 3decimal places
//eg 10.50 --> 10500
export function convertAmountToMiliunits(amount: number): number {
  return Math.round(amount * 1000);
}

export function convertAmountFromMiliunits(amount: number): number {
  return amount / 1000;
}
