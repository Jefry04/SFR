/* eslint-disable no-underscore-dangle */
import { Loader, Tabs } from '@mantine/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FieldCards from '../../components/FieldCards';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { RootState } from '../../store';
import { getFieldByUser } from '../../store/action-creators/Field.actonCreator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IField } from '../../types';
import { IProps, IBooking } from '../../types/profile.type';
import { deleteBooking } from '../../utils/getData';
import { getBookingByUser } from '../../store/action-creators/Booking.actionCreator';
import withAuth from '../../utils/HOC/witAuth';
import ProfileInfo from '../../components/profile/ProfileInfo';

const index = () => {
  const [token, setToken] = useState<string | null>('');
  const { isAdmin }: IProps = useAppSelector((state) => state.AuthReducer);
  const { isLoading, fieldsByUser }: IProps = useAppSelector(
    (state) => state.FieldReducer
  );
  const { bookinIsLoading, bookings }: IProps = useSelector(
    (state: RootState) => state.BookingReducer
  );
  const url = process.env.NEXT_PUBLIC_API_URL;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('token');
      setToken(localToken);
    }
  }, []);

  const hanldeBookingCancel = (bookingId: string) => {
    Swal.fire({
      title: '¿Está seguro de cancelar?',
      text: 'Está acción  cancleara la reserva',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, cancelar!',
      cancelButtonText: 'Cancelar',
      backdrop: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          deleteBooking(bookingId).then((response) => {
            if (response.status === 200) dispatch(getBookingByUser());
          });
        } catch (error) {
          Swal.showValidationMessage(`La petición falló.`);
        }
        return null;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Se cancelo la reserva`,
        });
      }
    });
  };

  const handleTabChange = (tabIndex: number, tabKey: string) => {
    if (tabKey === 'Canchas') {
      dispatch(getFieldByUser());
    }
    if (tabKey === 'Reservas') {
      dispatch(getBookingByUser());
    }
  };

  const handleDelete = async (fieldId: string) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está acción  eliminara la cancha completamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, Eliminalo!',
      cancelButtonText: 'Cancelar',
      backdrop: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await axios.delete(`${url}/fields/${fieldId}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          Swal.showValidationMessage(`La petición falló.`);
        }
        return null;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getFieldByUser());
        Swal.fire({
          title: `Se elimino la cancha`,
        });
      }
    });
  };

  return (
    <div className="user-profile">
      <ProfileHeader />
      <Tabs variant="outline" tabPadding="sm" onTabChange={handleTabChange}>
        <Tabs.Tab label="Perfil" tabKey="profile">
          <ProfileInfo />
        </Tabs.Tab>
        {isAdmin && (
          <Tabs.Tab label="Canchas" tabKey="Canchas">
            {isLoading ? (
              <div className="loading">
                <Loader color="yellow" size={100} />
              </div>
            ) : (
              <div className="card__container">
                {fieldsByUser &&
                  fieldsByUser.map((field: IField) => (
                    <FieldCards
                      field={field}
                      key={field._id}
                      onClick={() => handleDelete(field._id)}
                      bottonText="Eliminar cancha"
                    />
                  ))}
              </div>
            )}
          </Tabs.Tab>
        )}
        {!isAdmin && (
          <Tabs.Tab label="Reservas" tabKey="Reservas">
            {bookinIsLoading ? (
              <div className="loading">
                <Loader color="yellow" size={100} />
              </div>
            ) : (
              bookings &&
              bookings.map((booking: IBooking) => (
                <div key={booking._id} className="user__profile__bookings">
                  <h3> {booking?.fieldId?.fieldName}</h3>
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
              ))
            )}
          </Tabs.Tab>
        )}
      </Tabs>
    </div>
  );
};

export default withAuth(index);
