/* eslint-disable no-underscore-dangle */
import { Tabs } from '@mantine/core';
import { getDate } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FieldCards from '../../components/FieldCards';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { RootState } from '../../store';
import { IField } from '../../types';
import { IProps, IBooking } from '../../types/profile.type';
import { getBookingByUser, getFieldByUser } from '../../utils/getData';

const index = () => {
  const [token, setToken] = useState<string | null>('');
  const [fields, setFields] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { isAdmin }: IProps = useSelector(
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
    if (tabKey === 'Reservas') {
      getBookingByUser(token).then((items) => setBookings(items));
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
            {bookings &&
              bookings.map((booking: IBooking) => (
                <div key={booking._id}>
                  <p> {booking.fieldId.fieldName}</p>
                  <p>FECHA: {getDate(booking.bookingDate)}</p>
                </div>
              ))}
          </Tabs.Tab>
        )}
      </Tabs>
    </div>
  );
};

export default index;
