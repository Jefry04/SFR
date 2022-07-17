/* eslint-disable no-underscore-dangle */
import React from 'react';
import FieldCards from '../components/FieldCards';
import { getAllFields } from '../utils/getData';
import { IallFields, IField } from '../types';

const Home = ({ allFields }: IallFields) => {
  return (
    <div className="card__container">
      {allFields &&
        allFields.fields.map((field: IField) => (
          <FieldCards field={field} key={field._id} />
        ))}
    </div>
  );
};

export async function getServerSideProps() {
  const allFields = await getAllFields();
  return {
    props: {
      allFields,
    },
  };
}

export default Home;
