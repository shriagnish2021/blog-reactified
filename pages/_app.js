import '../styles/globals.css';
import { SWRConfig } from 'swr';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
// eslint-disable-next-line import/no-cycle
import Layout from '../components/Layout';

export const AuthenticationContext = React.createContext();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

toast.configure();
// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  const cookies = new Cookies();
  const [isLogged, setIsLogged] = useState(!!cookies.get('jwt'));
  const logginSettings = {
    isLogged,
    setIsLogged,
  };
  return (
    <AuthenticationContext.Provider value={logginSettings}>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </AuthenticationContext.Provider>
  );
}

export default MyApp;
