import React, { useState, FC, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  setHours,
  setMinutes,
  getTime,
  formatISO,
  toDate,
  getDate,
  getHours,
} from 'date-fns';
import { getFieldDetails } from '../../utils/getData';
import 'react-datepicker/dist/react-datepicker.css';
import { IField } from '../../types';

const FieldDetail: FC<{ field: IField }> = ({ field }) => {
  const [dateSelected, setSDateSelected] = useState(new Date());
  const [bookingArray, setBookingArray] = useState<any>([]);
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
  const excludedTimes = bookingArray.map((item: any) => {
    const result = getDate(new Date(item.bookingDate));
    const hour = getHours(new Date(item.bookingDate));

    // console.log(item);
    //  console.log('dia: ', result, 'hora: ', hour);
    // return new Date(item.bookingDate);
    return setHours(setMinutes(new Date(item.bookingDate), 0), 15);
  });

  // const filterPassedTime = () => {
  //   const currentDate = dateSelected;
  //   const selectedDate = new Date('Fri Jul 22 2022 20:00:00 GMT-0500');
  //   console.log(dateSelected, selectedDate);
  //   return currentDate === selectedDate;
  // };

  // console.log('arreglo de time: ', excludedTimes);
  // console.log(filterPassedTime());
  // console.log(new Date('Fri Jul 22 2022 20:00:00 GMT-0500'));
  // console.log(toDate(new Date('Fri Jul 22 2022 20:00:00 GMT-0500')));
  return (
    <>
      <div>{field.fieldName}</div>
      <DatePicker
        wrapperClassName="datePicker"
        showTimeSelect
        timeIntervals={60}
        // filterTime={filterPassedTime}
        selected={dateSelected}
        minTime={startDate}
        // excludeTimes={[toDate(new Date('Fri Jul 22 2022 20:00:00 GMT-0500'))]}
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
