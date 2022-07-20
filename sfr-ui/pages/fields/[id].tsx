import React, { FC } from 'react';
import { getFieldDetails } from '../../utils/getData';
import 'react-datepicker/dist/react-datepicker.css';
import { IField } from '../../types';
import FieldDetails from '../../components/FieldDetails';

const FieldDetail: FC<{ field: IField }> = ({ field }) => {
  return <FieldDetails field={field} />;
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
