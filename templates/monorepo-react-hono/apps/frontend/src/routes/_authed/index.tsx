import { createFileRoute } from '@tanstack/react-router';
import { client } from '~/utils/hc';

const fetchMe = async () => {
  const res = await client.api.me.$get();
  if (!res.ok) throw new Error('Failed to fetch me');
  return res.json();
};

export const Route = createFileRoute('/_authed/')({
  loader: async () => await fetchMe(),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
      <h1>Hola {data.name}</h1>
    </div>
  );
}
