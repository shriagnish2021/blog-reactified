/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable import/no-cycle */
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Blogged</title>
      <link rel="icon" href="/fav.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Bangers&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Header />
    <div className="container">{children}</div>
    <Footer />
  </>
);

export default Layout;
