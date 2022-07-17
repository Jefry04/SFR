/* eslint-disable no-underscore-dangle */
import { Card, Image, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { IField } from '../types';

const FieldCards: React.FC<{ field: IField }> = ({ field }) => {
  return (
    <Link href={`/fields/${field._id}`}>
      <div className="card">
        <header className="card__header">
          <Image src={field?.image?.url} height={160} alt="Cancha" />
        </header>
        <div className="card__body">
          <div className="card__body__info">
            <h3>NOMBRE: {field.fieldName}</h3>
            <span>
              <h4>Ciudad:</h4>
              <p>{field.city}</p>
            </span>
            <span>
              <h4>Direccion:</h4>
              <p>{field.address}</p>
            </span>
            <span>
              <h4>Telefono: </h4>
              <p> {field.phone}</p>
            </span>
          </div>
          <button type="button" className="card__button">
            Reserva
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FieldCards;
