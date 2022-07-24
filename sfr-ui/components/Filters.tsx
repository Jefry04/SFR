import React, { useState } from 'react';
import { Select } from '@mantine/core';
import {
  clearFieldsFilter,
  getFilterFields,
} from '../store/action-creators/Field.actonCreator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { IFilteredFields } from '../types';

const Filters = () => {
  const [city, setCity] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');
  const { filteredFields }: IFilteredFields = useAppSelector(
    (state) => state.FieldReducer
  );
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
      {filteredFields.length > 0 && (
        <button
          type="button"
          className="filter--button"
          onClick={() => dispatch(clearFieldsFilter())}
        >
          Mostrar todo
        </button>
      )}
    </div>
  );
};

export default Filters;
