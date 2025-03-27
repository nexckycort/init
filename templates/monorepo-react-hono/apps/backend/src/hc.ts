import { hc } from 'hono/client';
import type { routes } from './main.js';

// assign the client to a variable to calculate the type when compiling
const client = hc<typeof routes>('');
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof routes>(...args);
