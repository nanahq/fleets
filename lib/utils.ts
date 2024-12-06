import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formDataToObject<T = { [key: string]: string | undefined }>(formData: FormData): T {
  const object: { [key: string]: string | undefined } = {};
  formData.forEach((value, key) => {
      object[key] = Boolean(value.toString()) ? value.toString() : undefined;
  });
  return object as T;
}

export function getInitials(fullName?: string): string {

  if(!fullName) {
    return "NA"
  }
  const names = fullName?.trim().split(' ');

  if (names?.length < 2) {
    return names[0]?.charAt(0).toUpperCase()
  }

  const firstNameInitial = names[0].charAt(0).toUpperCase();
  const lastNameInitial = names[1].charAt(0).toUpperCase();

  return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
}
