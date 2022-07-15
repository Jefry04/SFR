/* eslint-disable react/require-default-props */

import React from 'react';
import { AppShell, Header } from '@mantine/core';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { IProps } from './LayoutContainer.type';
import { showCreateFieldForm } from '../../store/action-creators/Modals.action.Creator';

const LayoutContainer = ({ children }: IProps) => {
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();

  const handleClick = () => {
    dispatch(showCreateFieldForm());
  };
  return (
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
            <button type="button" onClick={handleClick}>
              Create field
            </button>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default LayoutContainer;
