/* eslint-disable react/require-default-props */

import React from 'react';
import { AppShell, Header } from '@mantine/core';
import { IProps } from './LayoutContainer.type';

const LayoutContainer = ({ children }: IProps) => {
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
            <p>LOGIN</p>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default LayoutContainer;
