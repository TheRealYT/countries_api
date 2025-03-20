import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import WorldView from './components/WorldView.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

import './App.css';

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Header/>
      <WorldView/>
      <Footer/>
    </QueryClientProvider>
  );
}

export default App;
