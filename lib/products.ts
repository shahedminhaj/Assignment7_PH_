import type { Category, Product } from "@/lib/types";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

async function fetchApi<T>(path: string): Promise<T> {
  const urls = [
    `${API_URL}${path}`,
    `https://api.abcz.workers.dev/api/bazardor${path}`,
  ];
  const errors: string[] = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) {
        errors.push(`${url}: HTTP ${response.status}`);
        continue;
      }
      return (await response.json()) as T;
    } catch (error) {
      errors.push(`${url}: ${error instanceof Error ? error.message : "Request failed"}`);
    }
  }

  throw new Error(`Unable to load market data. ${errors.join("; ")}`);
}

export function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>("/products");
}

export function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>("/categories");
}
