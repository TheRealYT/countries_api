import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import WorldView from './components/WorldView.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

import './App.css';
import {useRef, useState} from 'react';

function App() {
  const client = new QueryClient();
  const globe = useRef({});
  const [show, setShow] = useState(false);

  return (
    <QueryClientProvider client={client}>
      <Header show={show}/>
      <WorldView ref={globe} onAnimationEnd={() => setShow(true)}/>
      <Footer show={show}/>
    </QueryClientProvider>
  );
}

export default App;
