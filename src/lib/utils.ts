import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractValue = (item: any): any => {
  if (Array.isArray(item)) {
    return item.map((i) => extractValue(i));
  } else if (item && typeof item === "object") {
    if (item.value) {
      return extractValue(item.value);
    } else if (item.items) {
      return extractValue(item.items);
    } else if (item.properties) {
      return extractValue(item.properties);
    } else {
      // Return a specific property if it's not just 'value'
      return item.description || item.name || item; // Handle common cases
    }
  } else {
    return item;
  }
};

export const ensureString = (value: any): string => {
  const extracted = extractValue(value);
  if (typeof extracted === "string") {
    return extracted;
  } else if (extracted && typeof extracted === "object" && extracted.title) {
    return extractValue(extracted.title); // Attempt to extract title if it's an object
  } else {
    return ""; // Default to an empty string if nothing valid is found
  }
};

export const ensureArray = (value: any): any[] => {
  const extracted = extractValue(value);
  if (Array.isArray(extracted)) {
    return extracted;
  } else if (extracted !== undefined && extracted !== null) {
    return [extracted]; // Wrap non-array value in an array
  } else {
    return []; // Return an empty array if value is undefined or null
  }
};
