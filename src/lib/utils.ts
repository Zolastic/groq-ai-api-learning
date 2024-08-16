import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractValue = (item: any): any => {
  if (Array.isArray(item)) {
    return item.map((i) => extractValue(i));
  } else if (item && typeof item === "object") {
    if (item.value !== undefined) {
      return extractValue(item.value);
    } else if (item.items !== undefined) {
      console.log("Extracting value from items:", item.items);
      return extractValue(item.items);
    } else if (item.properties !== undefined) {
      return extractValue(item.properties);
    } else {
      return item.description || item.name || item.level || "";
    }
  } else {
    return item !== undefined ? item : "";
  }
};

export const ensureString = (value: any): string => {
  const extracted = extractValue(value);
  if (typeof extracted === "string") {
    return extracted;
  } else if (extracted && typeof extracted === "object" && extracted.title) {
    return extractValue(extracted.title);
  } else {
    return "";
  }
};

export const ensureArray = (value: any): any[] => {
  console.log("Ensuring array for value:", value);
  const extracted = extractValue(value);
  if (Array.isArray(extracted)) {
    return extracted;
  } else if (extracted !== undefined && extracted !== null) {
    return [extracted]; // Wrap non-array value in an array
  } else {
    return [];
  }
};
