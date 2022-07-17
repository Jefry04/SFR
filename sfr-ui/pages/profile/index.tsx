/* eslint-disable no-underscore-dangle */
import { Tabs } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FieldCards from '../../components/FieldCards';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { RootState } from '../../store';
import { showCreateFieldForm } from '../../store/action-creators/Modals.action.Creator';
import { useAppDispatch } from '../../store/hooks';
import { IField } from '../../types';
import { getFieldByUser } from '../../utils/getData';

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

const index = () => {
  const [token, setToken] = useState<string | null>('');
  const [fields, setFields] = useState([]);
  const { isAuth, user, isAdmin }: IProps = useSelector(
    (state: RootState) => state.AuthReducer
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('token');
      setToken(localToken);
    }
  }, []);

  const handleTabChange = (tabIndex: number, tabKey: string) => {
    if (tabKey === 'Canchas') {
      getFieldByUser(token).then((items) => setFields(items));
    }
  };
  return (
    <div className="user-profile">
      <ProfileHeader />
      <Tabs variant="outline" tabPadding="sm" onTabChange={handleTabChange}>
        <Tabs.Tab label="Perfil" tabKey="profile">
          {/* <ProfileForm user={user} /> */}
        </Tabs.Tab>
        {isAdmin && (
          <Tabs.Tab label="Canchas" tabKey="Canchas">
            {fields &&
              fields.map((field: IField) => (
                <FieldCards field={field} key={field._id} />
              ))}
          </Tabs.Tab>
        )}
        {!isAdmin && (
          <Tabs.Tab label="Reservas" tabKey="Reservas">
            <p> Reservas del cliente</p>
          </Tabs.Tab>
        )}
      </Tabs>
    </div>
  );
};

export default index;
