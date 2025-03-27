import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ context, location }) => {
    const checkAuth = await context.auth.checkAuth();
    if (!checkAuth) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
