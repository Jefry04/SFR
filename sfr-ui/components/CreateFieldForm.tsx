/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { useForm } from '@mantine/hooks';
import React, { useState } from 'react';
import { Eraser, Upload } from 'tabler-icons-react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Group, Button, Box, TextInput } from '@mantine/core';
import { createField } from '../store/action-creators/Field.actonCreator';
import { useAppDispatch } from '../store/hooks';

const CreateFieldForm = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const maxNumber = 69;
  const dispatch = useAppDispatch();

  // TODO SACAR Interfa de tipado
  interface IValuesCreateField {
    fieldName: string;
    capacity: number;
    city: string;
    description: string;
    address: string;
    phone: string;
  }

  const form = useForm<IValuesCreateField>({
    initialValues: {
      fieldName: '',
      capacity: 0,
      city: '',
      description: '',
      address: '',
      phone: '',
    },
  });

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
    console.log(imageList);
    // TODO para ingresar varias imagenes:
    const array: any = [];
    // eslint-disable-next-line array-callback-return
    imageList.map((item) => {
      array.push(item.file);
    });
    setFile(array[0]);
  };

  const handleCreateField = () => {
    const { fieldName, capacity, city, description, address, phone } =
      form.values;
    const data = new FormData();
    data.append('fieldName', fieldName);
    data.append('capacity', capacity as any);
    data.append('city', city);
    data.append('description', description);
    data.append('address', address);
    data.append('phone', phone);
    data.append('image', file as any);
    // TOD para subir varias imagenes
    // if (file) {
    //   for (let i = 0; i < file.length; i += 1) {
    //     data.append(`file_${i}`, file[i], file[i].name);
    //   }
    // }
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    dispatch(createField(data, token));
  };

  return (
    <div>
      <ImageUploading
        // multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Button
              leftIcon={<Upload />}
              size="xs"
              compact
              styles={(theme) => ({
                root: {
                  color: '#00473e',
                  backgroundColor: '#faae2b',
                  border: 0,
                  height: 30,
                  paddingLeft: 10,
                  paddingRight: 10,
                  '&:hover': {
                    backgroundColor: theme.fn.darken('#faae2b', 0.05),
                  },
                },
                leftIcon: {
                  marginRight: 8,
                },
              })}
              // variant="white"
              // color="yellow"
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Subir fotos
            </Button>
            <Button
              leftIcon={<Eraser />}
              onClick={onImageRemoveAll}
              size="xs"
              compact
              styles={(theme) => ({
                root: {
                  color: '#00473e',
                  backgroundColor: '#faae2b',
                  border: 0,
                  height: 30,
                  paddingLeft: 10,
                  paddingRight: 10,
                  '&:hover': {
                    backgroundColor: theme.fn.darken('#faae2b', 0.05),
                  },
                },
                leftIcon: {
                  marginRight: 8,
                },
              })}
            >
              Borrar imagenes
            </Button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button
                    style={{ marginRight: 10 }}
                    size="xs"
                    compact
                    styles={(theme) => ({
                      root: {
                        color: '#00473e',
                        backgroundColor: '#faae2b',
                        border: 0,
                        '&:hover': {
                          backgroundColor: theme.fn.darken('#faae2b', 0.05),
                        },
                      },
                    })}
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </Button>
                  <Button
                    style={{ marginRight: 10 }}
                    size="xs"
                    compact
                    styles={(theme) => ({
                      root: {
                        color: '#00473e',
                        backgroundColor: '#faae2b',
                        border: 0,
                        '&:hover': {
                          backgroundColor: theme.fn.darken('#faae2b', 0.05),
                        },
                      },
                    })}
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit(handleCreateField)}>
          <TextInput
            required
            label="Nombre"
            placeholder="Nombre de la Cancha"
            {...form.getInputProps('fieldName')}
          />
          <TextInput
            required
            label="Capacidad"
            placeholder="Capacidad jugadores"
            {...form.getInputProps('capacity')}
          />
          <TextInput
            required
            label="Ciudad"
            placeholder="Ciudad"
            {...form.getInputProps('city')}
          />
          <TextInput
            required
            label="Descripcion "
            placeholder="Descripcion de la cancha"
            {...form.getInputProps('description')}
          />
          <TextInput
            required
            label="Direccion "
            placeholder="Direccion de la cancha"
            {...form.getInputProps('address')}
          />
          <TextInput
            required
            label="Telefono"
            placeholder="Telefono de contacto"
            {...form.getInputProps('phone')}
          />
          <Group position="right" mt="md">
            <Button
              type="submit"
              compact
              styles={(theme) => ({
                root: {
                  color: '#00473e',
                  backgroundColor: '#faae2b',
                  border: 0,
                  height: 30,
                  paddingLeft: 10,
                  paddingRight: 10,
                  '&:hover': {
                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                  },
                },
                leftIcon: {
                  marginRight: 8,
                },
              })}
            >
              Crear cancha
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default CreateFieldForm;
