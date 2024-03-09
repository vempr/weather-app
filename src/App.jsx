import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Weather from './Weather.jsx';
import './index.css';

function App() {

    const client = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            }
        },
    });


    return(
        <main className="app">
            <header className="header">Alex Nguyen v1.1.1</header>

            <QueryClientProvider client={client}>
                <Weather className="weatherContainer"/>
            </QueryClientProvider>
        </main>
    );
}


export default App;
