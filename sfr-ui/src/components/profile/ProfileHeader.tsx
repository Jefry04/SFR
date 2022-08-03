import { UserCircle } from 'tabler-icons-react';
import { showCreateFieldForm } from '../../store/action-creators/Modals.action.Creator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IProps } from '../../types/profile.type';

const ProfileHeader = () => {
  const { user, isAdmin }: IProps = useAppSelector(
    (state) => state.AuthReducer
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
