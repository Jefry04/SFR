import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import {
  PasswordInput,
  Group,
  Button,
  Box,
  TextInput,
  Checkbox,
} from '@mantine/core';
import { FormValues } from '../types/register.type';
import { authRegister } from '../store/action-creators/Auth.actionCreator';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Register = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.AuthReducer);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) router.push('/');
  }, [isAuth]);

  const form = useForm<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const handleRegister = async () => {
    dispatch(authRegister(form.values));
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleRegister)}>
        <TextInput
          required
          label="Nombre"
          placeholder="Nombre"
          {...form.getInputProps('firstName')}
        />
        <TextInput
          required
          label="Apellido"
          placeholder="Apellido"
          {...form.getInputProps('lastName')}
        />
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

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps('confirmPassword')}
        />
        <Checkbox
          mt="md"
          label="admin"
          {...form.getInputProps('isAdmin', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Register;
