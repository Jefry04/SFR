import { Divider, Menu } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  Home,
  Login,
  Logout,
  SoccerField,
  User,
  UserCircle,
} from 'tabler-icons-react';
import { RootState } from '../../store';
import { logout } from '../../store/action-creators/Auth.actionCreator';
import {
  showCreateFieldForm,
  ShowLoginForm,
  showRegisterForm,
} from '../../store/action-creators/Modals.action.Creator';

interface IProps {
  isAuth: boolean;
  user: IUser;
  isAdmin: boolean;
}
interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  bookings: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const ProfileMenu = () => {
  const { isAuth, user, isAdmin }: IProps = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();
  const router = useRouter();

  const avatar = (
    <div className="header__avatar">
      <figure className="header__avatar__fig">
        <UserCircle size={40} strokeWidth={1} color="#00473e" />
      </figure>
    </div>
  );

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };
  return (
    <div className="header__user">
      <Menu control={avatar}>
        <Menu.Label>App</Menu.Label>
        <Link href="/" className="header__link">
          <Menu.Item icon={<Home size={14} />}>Home</Menu.Item>
        </Link>
        {isAuth && (
          <Link href="/profile" className="header__link">
            <Menu.Item icon={<User size={14} />}>Ir a perfil</Menu.Item>
          </Link>
          // <Menu.Item
          //   icon={<SoccerField size={14} />}
          //   onClick={() => dispatch(showCreateFieldForm())}
          // >
          //   Crear Cancha
          // </Menu.Item>
        )}
        <Divider />

        {!isAuth && (
          <>
            <Menu.Item
              icon={<Login size={14} />}
              onClick={() => dispatch(ShowLoginForm())}
            >
              Iniciar Sesi??n
            </Menu.Item>
            <Menu.Item
              icon={<User size={14} />}
              onClick={() => dispatch(showRegisterForm())}
            >
              Registrarse
            </Menu.Item>
          </>
        )}
        {isAuth && (
          <Menu.Item icon={<Logout size={14} />} onClick={handleLogout}>
            Cerrar Sesi??n
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default ProfileMenu;
