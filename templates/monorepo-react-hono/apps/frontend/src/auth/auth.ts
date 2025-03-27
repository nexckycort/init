import { inMemoryCache } from '~/utils/cache';
import { client } from '~/utils/hc';
import { removeToken, saveToken } from '~/utils/token';

export const auth = {
  async login(email: string, password: string) {
    try {
      const res = await client.api['sign-in'].$post({
        json: {
          email,
          password,
        },
      });
      if (!res.ok) {
        return null;
      }

      const response = await res.json();
      saveToken(response.token);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async signOut() {
    removeToken();
  },
  async currentAuthenticatedUser() {
    try {
      const cacheKey = 'currentAuthenticatedUser';
      const cacheTTL = 5000;

      const cachedData = inMemoryCache.get(cacheKey, cacheTTL);
      if (cachedData) {
        return cachedData;
      }

      const res = await client.api.me.$get();
      if (!res.ok) {
        removeToken();
        return null;
      }

      const response = await res.json();

      inMemoryCache.set(cacheKey, response);

      return response;
    } catch {
      return null;
    }
  },
};
