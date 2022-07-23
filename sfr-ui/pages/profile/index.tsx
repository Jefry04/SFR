/* eslint-disable no-underscore-dangle */
import { Tabs } from '@mantine/core';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FieldCards from '../../components/FieldCards';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { RootState } from '../../store';
import { IField } from '../../types';
import { IProps, IBooking } from '../../types/profile.type';
import {
  deleteBooking,
  getBookingByUser,
  getFieldByUser,
} from '../../utils/getData';

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

  const hanldeBookingCancel = (bookingId: string) => {
    deleteBooking(token, bookingId).then((response) => {
      if (response.status === 200)
        getBookingByUser(token).then((items) => setBookings(items));
    });
  };

  const handleTabChange = (tabIndex: number, tabKey: string) => {
    if (tabKey === 'Canchas') {
      getFieldByUser(token).then((items) => setFields(items));
    }
    if (tabKey === 'Reservas') {
      getBookingByUser(token).then((items) => setBookings(items));
    }
  };

  const handleDelete = async (fieldId: string) => {
    const response = await axios.delete(
      `http://localhost:8080/fields/${fieldId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    if (response.status === 200) alert('borrado con exito');
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
            <div className="card__container">
              {fields &&
                fields.map((field: IField) => (
                  <FieldCards
                    field={field}
                    key={field._id}
                    onClick={() => handleDelete(field._id)}
                    bottonText="Borrar cancha"
                  />
                ))}
            </div>
          </Tabs.Tab>
        )}
        {!isAdmin && (
          <Tabs.Tab label="Reservas" tabKey="Reservas">
            {bookings &&
              bookings.map((booking: IBooking) => (
                <div key={booking._id} className="user__profile__bookings">
                  <h3> {booking.fieldId.fieldName}</h3>
                  <p>
                    FECHA:{' '}
                    {format(
                      new Date(booking.bookingDate).getTime(),
                      'MMMM d, yyyy h:mm aa'
                    )}
                  </p>
                  <button
                    type="button"
                    className="card__button"
                    onClick={() => hanldeBookingCancel(booking._id)}
                  >
                    CANCELAR
                  </button>
                </div>
              ))}
          </Tabs.Tab>
        )}
      </Tabs>
    </div>
  );
};

export default index;
