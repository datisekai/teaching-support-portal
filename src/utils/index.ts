export * from "./upload-file";
export * from "./local-store";
export * from "./translate";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export function randomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
export function getImageUrl(url: string, name: string) {
  if (!url) {
    return `https://ui-avatars.com/api/?name=${name}`;
  }
  return `${url}`;
}
