import React from 'react';
import { useSelector } from 'react-redux';
import { UserCircle } from 'tabler-icons-react';
import { RootState } from '../../store';
import { showCreateFieldForm } from '../../store/action-creators/Modals.action.Creator';
import { useAppDispatch } from '../../store/hooks';

interface IProps {
  isAuth: boolean;
  user: IUser;
  isAdmin: boolean;
}
interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  bookings: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const ProfileHeader = () => {
  const { isAuth, user, isAdmin }: IProps = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const dispatch = useAppDispatch();

  const handleCreateField = () => {
    dispatch(showCreateFieldForm());
  };
  return (
    user && (
      <header className="user-profile__header">
        <div className="user-profile__header__info">
          <figure className="user-profile__header__fig">
            <UserCircle size={60} strokeWidth={1.5} color="#00473e" />
          </figure>
          <div className="user-profile__header__user-info">
            <h2 className="user-profile__user-name">
              {' '}
              {user.firstName} {user.lastName}{' '}
            </h2>
          </div>
        </div>
        <div className="user-profile__header__actions">
          {isAdmin && (
            <button
              type="button"
              onClick={handleCreateField}
              className="card__button"
            >
              Crear cancha
            </button>
          )}
        </div>
      </header>
    )
  );
};

export default ProfileHeader;
