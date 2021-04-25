import React from 'react';
import SignIn from './pages/SignIn';
import GlobalStyles from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => {

  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyles />
    </>
  );
}

export default App;
