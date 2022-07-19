import React, { useState, FC, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setHours, setMinutes } from 'date-fns';
import { getFieldDetails } from '../../utils/getData';
import 'react-datepicker/dist/react-datepicker.css';
import { IField } from '../../types';

const FieldDetail: FC<{ field: IField }> = ({ field }) => {
  const [dateSelected, setSDateSelected] = useState(new Date());
  const [bookingArray, setBookingArray] = useState<any>([]);
  const [bookingArray1, setBookingArray1] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;
  const startDate = setHours(setMinutes(new Date(), 0), 13);

  useEffect(() => {
    const fetchBookingDate = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/booking/${id}`);
        setBookingArray(response.data.boookingsByField);
        return response;
      } catch (error) {
        return error;
      }
    };
    fetchBookingDate();
  }, []);
  console.log('bookingarray: ', bookingArray);
  useEffect(() => {
    if (bookingArray.length === 0) return;
    const tempDates = bookingArray.map((item: any) => item.bookingDate);
    setBookingArray1(tempDates);
  }, [bookingArray]);

  let token: string | null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const handleClick = () => {
    const response = axios.post(
      `http://localhost:8080/booking/${id}`,
      { bookingDate: dateSelected },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
  };

  const filterTime = (time: Date) => {
    const bookingDates = bookingArray1?.map((item: Date) =>
      new Date(item).getTime()
    );
    const selectedDate = new Date(time).getTime();

    return !bookingDates?.includes(selectedDate);
  };

  return (
    <>
      <div>{field.fieldName}</div>
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
      <button type="button" onClick={handleClick}>
        {' '}
        RESERVAR
      </button>
    </>
  );
};

export async function getServerSideProps({ query }: any) {
  const field = await getFieldDetails(query.id);
  return {
    props: {
      field,
    },
  };
}

export default FieldDetail;
