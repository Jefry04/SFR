import { Card, Image, Text, Button, Group } from '@mantine/core';
import { IField } from '../types';

const FieldCards: React.FC<{ field: IField }> = ({ field }) => {
  return (
    <div className="card">
      <header className="card__header">
        <Image src={field.image.url} height={160} alt="Norway" />
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
  );
};

export default FieldCards;