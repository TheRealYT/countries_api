import {useRef, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import WorldView from './components/WorldView.jsx';
import Header from '@/components/Header.jsx';
import MainContent from '@/components/MainContent.jsx';

import './App.css';

function App() {
  const client = new QueryClient();
  const globe = useRef({});
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const [country, setCountry] = useState(null);

  const api = {
    toggleUi() {
      setShow(!show);
    },
    search: globe.current.search,
    select: globe.current.select,
    moveCloser: globe.current.moveCloser,
    setMarkers: globe.current.setMarkers,
  };

  const onCountryChange = (newValue) => {
    setCountry(newValue)
  };

  const onAnimationEnd = () => {
    setReady(true);
    setTimeout(() => setShow(true), 300);
  };

  return (
    <QueryClientProvider client={client}>
      {ready && <Header show={show} api={api}/>}
      <WorldView ref={globe} onCountryChange={onCountryChange} onAnimationEnd={onAnimationEnd}/>
      {ready && <MainContent show={show} api={api} country={country}/>}
    </QueryClientProvider>
  );
}

export default App;
