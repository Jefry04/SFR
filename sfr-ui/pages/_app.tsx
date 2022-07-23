import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import '../index.scss';
import type { AppProps } from 'next/app';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { wrapper, store } from '../store';
import LayoutContainer from '../components/Layout/LayoutContainer';
import { getUerData } from '../store/action-creators/Auth.actionCreator';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUerData(token));
    }
  }, []);

  return (
    <Provider store={store}>
      <LayoutContainer>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
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
  );
}

export default wrapper.withRedux(MyApp);
