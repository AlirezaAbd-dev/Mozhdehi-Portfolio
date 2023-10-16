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
import scheduleValidation from '@/validations/scheduleValidation';
import {
  addScheduleAction,
  editScheduleAction,
} from '@/actions/scheduleActions';
import Schedules from '../tables/Schedules';

export type Schedule = {
  _id: string;
  name: string;
  time: string;
  place: string;
};

export type ScheduleFormProps = {
  schedules: Schedule[];
};
export type ScheduleType = z.infer<typeof scheduleValidation>;

const ScheduleForm = (props: ScheduleFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Schedule>();

  const { control, handleSubmit, reset } = useForm<ScheduleType>({
    resolver: zodResolver(scheduleValidation),
    values: selectedItem
      ? {
          name: selectedItem.name,
          place: selectedItem.place,
          time: selectedItem.time,
        }
      : { place: '', name: '', time: '' },
  });

  async function articleHandler(value: ScheduleType) {
    setLoading(true);
    let response;
    if (!selectedItem) {
      response = await addScheduleAction(localStorage.getItem('token')!, value);
    } else {
      response = await editScheduleAction(
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
        return alert('برنامه زمانی با موفقیت ویرایش شد');
      }
      alert('برنامه زمانی با موفقیت اضافه شد');
    }
  }

  return (
    <>
      <Typography variant='h6'>اضافه کردن کار/کلاس</Typography>

      <Schedules
        schedules={props.schedules}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <Box
        component={'form'}
        onSubmit={handleSubmit(articleHandler)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 2,
        }}
      >
        <Controller
          name='name'
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                dir='rtl'
                label='نام کار/کلاس'
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
          name='place'
          control={control}
          render={({ field, fieldState }) => {
            return (
              <TextField
                dir='rtl'
                label='مکان'
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

export default ScheduleForm;
