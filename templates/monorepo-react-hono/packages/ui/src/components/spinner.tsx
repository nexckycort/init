import { Loader2 } from 'lucide-react';

export function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-asphalt" />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
