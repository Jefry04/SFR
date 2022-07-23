/* eslint-disable no-underscore-dangle */

import { Image } from '@mantine/core';
import Link from 'next/link';
import { IFieldCardsProps } from '../types';

const FieldCards = ({ field, onClick, bottonText }: IFieldCardsProps) => {
  return (
    <div className="card">
      <header className="card__header">
        <Image src={field?.images[0]?.url} height={160} alt="Cancha" />
      </header>

      <div className="card__body">
        <Link href={`/fields/${field._id}`}>
          <div className="card__body__info">
            <div className="card__body__info_title">
              <h3>NOMBRE: </h3>

              <h4>Ciudad:</h4>

              <h4>Direccion:</h4>

              <h4>Telefono: </h4>
            </div>
            <div className="card__body__info_data">
              <h3>{field.fieldName}</h3>
              <p>{field.city}</p>
              <p>{field.address}</p>
              <p> {field.phone}</p>
            </div>
          </div>
        </Link>
        {bottonText === 'ver mas' ? (
          <Link href={`/fields/${field._id}`}>
            <button type="button" className="card__button">
              {bottonText}
            </button>
          </Link>
        ) : (
          <button type="button" className="card__button" onClick={onClick}>
            {bottonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default FieldCards;
