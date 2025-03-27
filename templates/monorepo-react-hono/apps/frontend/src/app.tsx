import { RouterProvider, createRouter } from '@tanstack/react-router';
import type { AuthContextProps } from '~/auth/auth-context';
import { useAuth } from '~/auth/use-auth';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: undefined as unknown as {
    auth: AuthContextProps;
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
