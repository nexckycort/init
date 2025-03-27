import { blue, yellow } from 'kolorist';

export const FRAMEWORK = [
  {
    name: 'react-hono',
    display: 'React and Hono',
    color: blue,
    options: [],
  },
  {
    name: 'solid',
    display: 'Solid',
    color: yellow,
    options: [],
  },
] as const;

export type FRAMEWORKS = (typeof FRAMEWORK)[number]['name'];
