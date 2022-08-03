import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import '../index.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { wrapper, store } from '../store';
import LayoutContainer from '../components/Layout/LayoutContainer';
import { getUserData } from '../store/action-creators/Auth.actionCreator';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../store/hooks';
import { IProps } from '../types/profile.type';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();
  const { user }: IProps = useAppSelector((state) => state.AuthReducer);

  let token: string | null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token));
    }
  }, []);

  return (
    <>
      <Head>
        <title>SFR</title>
        <meta name="SFR" content="Soccer field rental" />
        <link rel="icon" href="/LOGO.png" />
      </Head>
      <Provider store={store}>
        <LayoutContainer>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            theme="dark"
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
          />
        </LayoutContainer>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
