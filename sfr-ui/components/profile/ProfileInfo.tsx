import { List, Text, ThemeIcon } from '@mantine/core';
import React from 'react';
import { Alien, CircleCheck, CircleDashed, Mail } from 'tabler-icons-react';
import { useAppSelector } from '../../store/hooks';
import { IProps } from './ProfileHeader';

const ProfileInfo = () => {
  const { isAdmin, user }: IProps = useAppSelector(
    (state) => state.AuthReducer
  );
  return (
    user && (
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <CircleCheck size={16} />
          </ThemeIcon>
        }
      >
        <List.Item
          icon={
            <ThemeIcon color="yellow" size={24} radius="xl">
              <Alien size={16} />
            </ThemeIcon>
          }
        >
          <Text color="#00473e" size="xl">
            {user.firstName} {user.lastName}{' '}
          </Text>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="yellow" size={24} radius="xl">
              <Mail size={16} />
            </ThemeIcon>
          }
        >
          <Text color="#00473e" size="xl">
            {user.email}
          </Text>
        </List.Item>
        {isAdmin && (
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <CircleDashed size={16} />
              </ThemeIcon>
            }
          >
            <Text color="#00473e" size="xl">
              Administrador
            </Text>
          </List.Item>
        )}
      </List>
    )
  );
};

export default ProfileInfo;
