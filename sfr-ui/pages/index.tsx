/* eslint-disable no-underscore-dangle */
import FieldCards from '../components/FieldCards';
import { getAllFields } from '../utils/getData';
import { IallFields, IField, IFilteredFields } from '../types';
import LandingSwiper from '../components/Layout/LandingSwiper';
import Filters from '../components/Filters';
import { useAppSelector } from '../store/hooks';

const Home = ({ allFields }: IallFields) => {
  const { filteredFields }: IFilteredFields = useAppSelector(
    (state) => state.FieldReducer
  );
  return (
    <>
      <div className="filters-wrapper">
        <Filters />
      </div>
      {filteredFields.length > 0 && (
        <div className="card__container">
          {filteredFields.map((field: IField) => (
            <FieldCards field={field} key={field._id} bottonText="ver mas" />
          ))}
        </div>
      )}
      {filteredFields.length === 0 && (
        <>
          <div className="wrapper">
            <LandingSwiper />
          </div>
          <div className="card__container">
            {allFields &&
              allFields.fields.map((field: IField) => (
                <FieldCards
                  field={field}
                  key={field._id}
                  bottonText="ver mas"
                />
              ))}
          </div>
        </>
      )}
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
