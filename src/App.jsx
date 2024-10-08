import { ThemeProvider } from './contexts/ThemeContext';
import Router from './routes';
import { Toaster } from 'sonner';

export default function App() {
    return (
        <ThemeProvider>
            <Router />
            <Toaster richColors />
        </ThemeProvider>
    );
}
