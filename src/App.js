import React from 'react';
import Home from './components/Home';
import { ApolloProvider } from '@apollo/client';

const App = (props) => {
  return (
    <ApolloProvider client={props.client}>
      <Home/>
    </ApolloProvider>
  );
}

export default App;
