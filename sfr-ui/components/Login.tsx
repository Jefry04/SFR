import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { PasswordInput, Group, Button, Box, TextInput } from '@mantine/core';
import { IloginForm } from '../types/register.type';
import { authUser } from '../store/action-creators/Auth.actionCreator';
import { RootState } from '../store';
import { useAppDispatch } from '../store/hooks';

const Login = () => {
  const dispatch = useAppDispatch();
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

  const handleLogin = async () => {
    dispatch(authUser(form.values));
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleLogin)}>
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
