import { Toaster } from 'sonner';
import AppProvider from './providers';
import AppRouter from './routes';

export default function App() {
  return (
    <AppProvider>
      <Toaster position="top-center" richColors />
      <AppRouter />
    </AppProvider>
  );
}
