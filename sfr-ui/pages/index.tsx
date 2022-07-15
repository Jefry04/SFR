/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import FieldCards from '../components/FieldCards';
import { getAllFields } from '../utils/getData';
import { IallFields, IField } from '../types';
import { RootState } from '../store';
import PublicModal from '../components/PublicModal';
import { hideCreateFieldForm } from '../store/action-creators/Modals.action.Creator';
import Login from '../components/Login';
import CreateFieldForm from '../components/CreateFieldForm';

const Home = ({ allFields }: IallFields) => {
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();
  const { showCreateFieldForm } = useSelector(
    (state: RootState) => state.ModalsReducer
  );

  const handleClose = () => {
    dispatch(hideCreateFieldForm());
  };
  return (
    <>
      <div className="card__container">
        {allFields &&
          allFields.fields.map((field: IField) => (
            <FieldCards field={field} key={field._id} />
          ))}
      </div>
      <PublicModal opened={showCreateFieldForm} onClose={handleClose}>
        <CreateFieldForm />
      </PublicModal>
    </>
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
