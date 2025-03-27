import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { Spinner } from '@workspace/ui/components/spinner';
import type { AuthContextProps } from '~/auth/auth-context';
import { useAuth } from '~/auth/use-auth';

export const Route = createRootRouteWithContext<{
  auth: AuthContextProps;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const { loading } = useAuth();

  if (loading) return <Spinner />;

  return <Outlet />;
}
