/* eslint-disable react/require-default-props */
import React, { FC } from 'react';
import { Modal } from '@mantine/core';
import { IPubliModalProps } from '../types/publicModal.type';

const PublicModal: FC<IPubliModalProps> = ({
  opened,
  children,
  onClose,
  size,
  title,
}) => {
  return (
    <Modal opened={opened} onClose={onClose} size={size} title={title} centered>
      {children}
    </Modal>
  );
};

export default PublicModal;
