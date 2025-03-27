export class InMemoryCache {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private cache: Map<string, { data: any; timestamp: number }> = new Map();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get(key: string, ttl: number): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

export const inMemoryCache = new InMemoryCache();
