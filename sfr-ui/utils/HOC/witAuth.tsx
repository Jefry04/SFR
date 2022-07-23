import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from '../../store/hooks';

function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const router = useRouter();
    const { isAuth }: any = useAppSelector((state) => state.AuthReducer);
    // Login data added to props via redux-store (or use react context for example)
    // const { isLoggedIn } = props;

    // If user is not logged in, return login component
    useEffect(() => {
      if (!isAuth) {
        router.push('/');
      }
    }, []);
    // if (!isAuth) {
    //   <Login />;
    // }
    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
