import React from 'react';
import Routes from './routes';
import GlobalStyles from './styles/global';

import AppProvider from './hooks';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
