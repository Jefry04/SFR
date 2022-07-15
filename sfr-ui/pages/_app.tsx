import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import '../index.scss';
import type { AppProps } from 'next/app';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { wrapper, store } from '../store';
import LayoutContainer from '../components/Layout/LayoutContainer';
import { getUerData } from '../store/action-creators/Auth.actionCreator';

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
      </LayoutContainer>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
