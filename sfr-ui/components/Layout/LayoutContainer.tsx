/* eslint-disable react/require-default-props */

import React from 'react';
import { AppShell, Header } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
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
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <p>SFR</p>
              <ProfileMenu />
            </div>
          </Header>
        }
      >
        {children}
      </AppShell>
      <PublicModal opened={showCreateFieldForm} onClose={handleClose}>
        <CreateFieldForm />
      </PublicModal>
      <PublicModal opened={showLoginForm} onClose={handleCloseLoginModal}>
        <Login />
      </PublicModal>
      <PublicModal opened={showRegisterForm} onClose={handleCloseRegisterModal}>
        <Register />
      </PublicModal>
    </>
  );
};

export default LayoutContainer;
