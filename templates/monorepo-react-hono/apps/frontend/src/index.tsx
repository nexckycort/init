import '@workspace/ui/globals.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '~/auth/auth-context';
import { App } from './app';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  );
}
