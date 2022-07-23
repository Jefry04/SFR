import React, { useState, FC, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Image } from '@mantine/core';
import { useRouter } from 'next/router';
import { setHours, setMinutes } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { Beer, DeviceTv, Parking } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { IField } from '../types';
import { RootState } from '../store';
import { useAppDispatch } from '../store/hooks';
import { ShowLoginForm } from '../store/action-creators/Modals.action.Creator';

interface IProps {
  isAuth: boolean;
}

const fetchBookingDate = async (id: string | string[] | undefined) => {
  try {
    const response = await axios.get(`http://localhost:8080/booking/${id}`);
    // setBookingArray(response.data.boookingsByField);
    return response;
  } catch (error) {
    return error;
  }
};

const FieldDetails: FC<{ field: IField }> = ({ field }) => {
  const [dateSelected, setSDateSelected] = useState(new Date());
  const [bookingArray, setBookingArray] = useState<any>([]);
  const [bookingArrayDates, setbookingArrayDates] = useState<any>([]);
  const { isAuth }: IProps = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const startDate = setHours(setMinutes(new Date(), 0), 13);

  useEffect(() => {
    fetchBookingDate(id).then((response: any) =>
      setBookingArray(response.data.boookingsByField)
    );
  }, []);

  useEffect(() => {
    if (bookingArray.length === 0) return;
    const tempDates = bookingArray.map((item: any) => item.bookingDate);
    setbookingArrayDates(tempDates);
  }, [bookingArray]);

  let token: string | null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (!isAuth) {
      dispatch(ShowLoginForm());
    } else {
      Swal.fire({
        title: 'RESERVAR',
        text: `Desea reservar para el dia ${dateSelected} ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, Reservar!',
        cancelButtonText: 'Cancelar',
        backdrop: true,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const response = await axios.post(
              `http://localhost:8080/booking/${id}`,
              { bookingDate: dateSelected },
              {
                headers: {
                  Authorization: `bearer ${token}`,
                },
              }
            );
            return response.data;
          } catch (error) {
            Swal.showValidationMessage(`La petición falló.`);
          }
          return null;
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          fetchBookingDate(id).then((response: any) =>
            setBookingArray(response.data.boookingsByField)
          );
          Swal.fire({
            title: `Reserva confirmada, puedes ver tus reservas en tu perfil`,
          });
        }
      });
    }
  };

  const filterTime = (time: Date) => {
    const bookingDates = bookingArrayDates?.map((item: Date) =>
      new Date(item).getTime()
    );
    const selectedDate = new Date(time).getTime();

    return !bookingDates?.includes(selectedDate);
  };

  return (
    <div className="fieldDetail--container">
      <div className="fieldDetail__title">
        <h3>CANCHA: </h3> <p>{field.fieldName}</p>
      </div>
      <div className="field__image">
        <Image src={field?.images[0]?.url} height={160} alt="Cancha" />
      </div>
      <div className="fieldDetails__info">
        <div className="fieldDetails__info__description">
          <div className="fieldDetails__body__info_title">
            <h4>Ciudad:</h4>
            <h4>Direccion:</h4>
            <h4>Telefono: </h4>
            <h4>Descripcion: </h4>
          </div>
          <div className="fieldDetails__body__info_data">
            <p>{field.city}</p>
            <p>{field.address}</p>
            <p> {field.phone}</p>
            <p>{field.description}</p>
          </div>
        </div>
        <div className="fieldDetails__calendar">
          <h4>Consulta disponibilidad:</h4>
          <DatePicker
            wrapperClassName="datePicker"
            showTimeSelect
            timeIntervals={60}
            filterTime={filterTime}
            selected={dateSelected}
            minTime={startDate}
            maxTime={setHours(setMinutes(new Date(), 0), 22)}
            placeholderText="Click to select a date"
            minDate={startDate}
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={(date: Date) => setSDateSelected(date)}
          />
          {!isAuth && <p>Debes iniciar sesion para reservar</p>}
          <button type="button" onClick={handleClick} className="card__button">
            {isAuth ? 'RESERVAR' : 'LOGIN'}
          </button>
        </div>
      </div>
      <div className="fieldDetails__footer">
        <div className="fieldDetails__footer__icons">
          <Beer size={60} strokeWidth={1} color="#faae2c" />
          <p>1</p>
        </div>
        <div className="fieldDetails__footer__icons">
          <Parking size={60} strokeWidth={1} color="#faae2c" />
          <p>SI</p>
        </div>
        <div className="fieldDetails__footer__icons">
          <DeviceTv size={60} strokeWidth={1} color="#faae2c" />
          <p>SI</p>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;
