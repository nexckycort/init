import { hcWithType } from '@workspace/backend/hc';
import { API_URL } from '~/config/environment';
import { getToken } from './token';

export const client = hcWithType(API_URL, {
  async headers() {
    const token = getToken();

    return {
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  },
});
