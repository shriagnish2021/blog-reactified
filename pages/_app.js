import '../styles/globals.css';
import { SWRConfig } from 'swr';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import Layout from '../components/Layout';

export const AuthenticationContext = React.createContext();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

toast.configure();
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
                    <Component {...pageProps} />
                </Layout>
            </SWRConfig>
        </AuthenticationContext.Provider>
    );
}

export default MyApp;
