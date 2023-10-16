import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import workValidation from '@/validations/workValidation';
import { addWorkAction, editWorkAction } from '@/actions/workActions';
import Works from '../tables/Works';

export type Work = {
  _id: string;
  company: string;
  time: string;
  post: string;
};

export type WorkFormProps = {
  works: Work[];
};
export type WorkType = z.infer<typeof workValidation>;

const WorkForm = (props: WorkFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Work>();

  const { control, handleSubmit, reset } = useForm<WorkType>({
    resolver: zodResolver(workValidation),
    values: selectedItem
      ? {
          company: selectedItem.company,
          post: selectedItem.post,
          time: selectedItem.time,
        }
      : { company: '', post: '', time: '' },
  });

  async function workHandler(value: WorkType) {
    setLoading(true);
    let response;
    if (!selectedItem) {
      response = await addWorkAction(localStorage.getItem('token')!, value);
    } else {
      response = await editWorkAction(
        localStorage.getItem('token')!,
        selectedItem._id,
        value,
      );
    }
    setLoading(false);

    if (response.status !== 200) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        router.replace('/');
      }

      return alert(response.message.message);
    }

    if (response.status === 200) {
      reset();
      if (selectedItem) {
        setSelectedItem(undefined);
        return alert('سابقه کار با موفقیت ویرایش شد');
      }
      alert('سابقه کار با موفقیت اضافه شد');
    }
  }

  return (
    <>
      <Typography variant='h6'>اضافه کردن سابقه کار</Typography>

      <Works
        works={props.works}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <Box
        component={'form'}
        onSubmit={handleSubmit(workHandler)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 2,
        }}
      >
        <Controller
          name='company'
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                dir='rtl'
                label='نام شرکت'
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            );
          }}
        />
        <Controller
          name='post'
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                dir='rtl'
                label='سمت'
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            );
          }}
        />
        <Controller
          name='time'
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                dir='rtl'
                label='زمان'
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            );
          }}
        />

        <Button
          type='submit'
          variant='contained'
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={25} />
          ) : selectedItem ? (
            'ویرایش'
          ) : (
            'اضافه کردن'
          )}
        </Button>
      </Box>
    </>
  );
};

export default WorkForm;
