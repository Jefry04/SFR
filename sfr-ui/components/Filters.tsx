import { Select } from '@mantine/core';
import React, { useState } from 'react';
import { getFilterFields } from '../store/action-creators/Field.actonCreator';
import { useAppDispatch } from '../store/hooks';

const Filters = () => {
  const [city, setCity] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleFilter = async () => {
    dispatch(getFilterFields(city, capacity));
  };
  return (
    <div className="filters">
      <Select
        label="Ciudad"
        placeholder="Ciudad"
        searchable
        clearable
        nothingFound="No options"
        data={['Bogota', 'Medellin']}
        size="xs"
        onChange={(value: string) => setCity(value)}
      />
      <Select
        label="Cantidad de jugadores"
        placeholder="Capacidad"
        searchable
        clearable
        nothingFound="No options"
        data={['12', '14', '16', '20', '22']}
        size="xs"
        onChange={(value: string) => setCapacity(value)}
      />
      <button
        type="button"
        disabled={!(city || capacity)}
        className={city || capacity ? 'filter--button' : 'button__disabled'}
        onClick={handleFilter}
      >
        Filtrar
      </button>
    </div>
  );
};

export default Filters;
