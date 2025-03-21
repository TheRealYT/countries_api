import {useRef, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import WorldView from './components/WorldView.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

import './App.css';

function App() {
  const client = new QueryClient();
  const globe = useRef({});
  const [show, setShow] = useState(false);

  const api = {
    toggleUi() {
      setShow(!show);
    },
    search: globe.current.search,
    select: globe.current.select,
    moveCloser: globe.current.moveCloser,
  };

  const onAnimationEnd = () => {
    setTimeout(() => setShow(true), 300);
  };

  return (
    <QueryClientProvider client={client}>
      <Header show={show} api={api}/>
      <WorldView ref={globe} onAnimationEnd={onAnimationEnd}/>
      <Footer show={show} api={api}/>
    </QueryClientProvider>
  );
}

export default App;
