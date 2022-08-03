/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */

import React from 'react';
import { AppShell, Header } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Image from 'next/image';
import Link from 'next/link';
import { IProps } from './LayoutContainer.type';
import ProfileMenu from './ProfileMenu';
import PublicModal from '../PublicModal';
import CreateFieldForm from '../CreateFieldForm';
import { RootState } from '../../store';
import {
  hideCreateFieldForm,
  hideLoginForm,
  hideRegisterForm,
} from '../../store/action-creators/Modals.action.Creator';
import Login from '../Login';
import Register from '../Register';
import logo from '../../public/assets/LOGO.png';

const LayoutContainer = ({ children }: IProps) => {
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();
  const { showCreateFieldForm, showLoginForm, showRegisterForm } = useSelector(
    (state: RootState) => state.ModalsReducer
  );
  const handleClose = () => {
    dispatch(hideCreateFieldForm());
  };

  const handleCloseLoginModal = () => {
    dispatch(hideLoginForm());
  };

  const handleCloseRegisterModal = () => {
    dispatch(hideRegisterForm());
  };

  return (
    <>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <div
              className="header__tittle"
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              {/* <img src={logo} alt="logo" /> */}
              <Link href="/" passHref>
                <a>
                  <Image
                    width={150}
                    height={60}
                    src={logo}
                    className="header__logo"
                  />
                </a>
              </Link>
              <h3>BIENVENIDOS A LA MEJOR PAGINA DE RESERVAS DE CANCHA</h3>
              <ProfileMenu />
            </div>
          </Header>
        }
      >
        {children}
      </AppShell>
      <PublicModal
        opened={showCreateFieldForm}
        onClose={handleClose}
        title="Crear cancha"
      >
        <CreateFieldForm />
      </PublicModal>
      <PublicModal
        opened={showLoginForm}
        onClose={handleCloseLoginModal}
        title="Login"
      >
        <Login />
      </PublicModal>
      <PublicModal
        opened={showRegisterForm}
        onClose={handleCloseRegisterModal}
        title="Registro de usuario"
      >
        <Register />
      </PublicModal>
    </>
  );
};

export default LayoutContainer;
