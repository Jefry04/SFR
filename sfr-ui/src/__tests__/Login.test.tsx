/* eslint-disable import/no-extraneous-dependencies */
import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { store } from '../store';
import Login from '../components/Login';

const render = (component: any) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

it('allows me to type my name', () => {
  render(<Login />);

  userEvent.type(screen.getByLabelText(/email/i), 'correo@correo.com');
});
