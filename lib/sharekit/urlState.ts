import type { ReadonlyURLSearchParams } from "next/navigation";

export function getParam(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  fallback: string
) {
  return searchParams.get(key) ?? fallback;
}

export function buildUpdatedQueryString(
  searchParams: ReadonlyURLSearchParams,
  updates: Record<string, string | null | undefined>
) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  });

  return params.toString();
}