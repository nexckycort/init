import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useState } from 'react';
import { useAuth } from '~/auth/use-auth';

export const Route = createFileRoute('/sign-in')({
  validateSearch: (search: Record<string, string>): { redirect?: string } => {
    return {
      redirect: search.redirect,
    };
  },
  beforeLoad: async ({ context, search }) => {
    const checkAuth = await context.auth.checkAuth();
    if (checkAuth) {
      throw redirect({
        to: (search as Record<string, string>).redirect || '/',
      });
    }
  },
  component: SignInComponent,
});

function SignInComponent() {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const search = Route.useSearch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const fieldValue = data.get('email');

      if (!fieldValue) return;

      const username = fieldValue.toString();
      await auth.login(username, password);

      await router.invalidate();

      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.error('Error logging in: ', error);
    } finally {
      setIsSubmitting(false);
    }
    /* e.preventDefault()
    // Add your authentication logic here
    // For demonstration, we'll just show an error if fields are empty
    if (!email || !password) {
      setError("Please fill in all fields")
    } else {
      setError("")

      /* await login(
        email,
        password
      )

      const pathname = location.pathname
      const path = pathname.startsWith('/login') ? '/' : pathname
      route(path) *
    } */
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="/placeholder.svg?height=48&width=48"
              alt="Room Reservation Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <a
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
