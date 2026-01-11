

export function isAxiosError(error) {
  return typeof error === "object" && error !== null && "response" in error;
}
