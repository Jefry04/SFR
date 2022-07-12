import React from 'react';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, TextInput } from '@mantine/core';
import { IloginForm } from '../types/register.type';

const register = () => {
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
    const { data } = await axios.post(
      'http://localhost:8080/auth/login',
      form.values
    );
    const { token } = data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
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

export default register;
