import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import LayoutContainer from '../components/Layout/LayoutContainer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutContainer>
      <Component {...pageProps} />;
    </LayoutContainer>
  );
}

export default MyApp;
