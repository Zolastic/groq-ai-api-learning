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
      return extractValue(item.items);
    } else if (item.properties !== undefined) {
      return extractValue(item.properties);
    } else if (
      item.level !== undefined &&
      item.level.value !== undefined &&
      item.name !== undefined &&
      item.name.value !== undefined
    ) {
      return { name: item.name.value, level: item.level.value };
    } else if (
      item.description !== undefined &&
      item.description.value !== undefined
    ) {
      return item.description.value;
    } else {
      return (
        item.description ||
        (item.description && item.description.value) ||
        item.name ||
        (item.name && item.name.value) ||
        item.title ||
        ""
      );
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
  const extracted = extractValue(value);
  if (Array.isArray(extracted)) {
    return extracted;
  } else if (extracted !== undefined && extracted !== null) {
    return [extracted];
  } else {
    return [];
  }
};
