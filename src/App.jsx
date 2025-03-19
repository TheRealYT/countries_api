import WorldView from './components/WorldView.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <WorldView/>
    </QueryClientProvider>
  );
}

export default App;
