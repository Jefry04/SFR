import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { ThunkDispatch } from 'redux-thunk';
import { useRouter } from 'next/router';
import { AnyAction } from 'redux';
import { PasswordInput, Group, Button, Box, TextInput } from '@mantine/core';
import { IloginForm } from '../types/register.type';
import { authUser } from '../store/action-creators/Auth.actionCreator';
import { RootState } from '../store';

const Login = () => {
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.AuthReducer);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) router.push('/');
  }, [isAuth]);

  const form = useForm<IloginForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleRegister = async () => {
    dispatch(authUser(form.values));
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleRegister)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Login;
