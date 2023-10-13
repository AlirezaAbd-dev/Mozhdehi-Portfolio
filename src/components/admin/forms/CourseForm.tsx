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
import courseValidation from '@/validations/courseValidation';
import { addCourseAction, editCourseAction } from '@/actions/courseActions';
import Courses from '../tables/Courses';

export type Course = {
   _id: string;
   name: string;
   price: number;
   duration: string;
};

export type CourseFormProps = {
   courses: Course[];
};
export type CourseType = z.infer<typeof courseValidation>;

const CourseForm = (props: CourseFormProps) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [selectedItem, setSelectedItem] = useState<Course>();

   const { control, handleSubmit, reset } = useForm<CourseType>({
      resolver: zodResolver(courseValidation),
      values: selectedItem
         ? {
              name: selectedItem.name,
              price: selectedItem.price,
              duration: selectedItem.duration,
           }
         : { price: 0, name: '', duration: '' },
   });

   async function bookHandler(value: CourseType) {
      setLoading(true);
      let response;
      if (!selectedItem) {
         response = await addCourseAction(
            localStorage.getItem('token')!,
            value,
         );
      } else {
         response = await editCourseAction(
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
            return alert('دوره با موفقیت ویرایش شد');
         }
         alert('دوره با موفقیت اضافه شد');
      }
   }

   return (
      <>
         <Typography variant='h6'>اضافه کردن کتاب</Typography>

         <Courses
            courses={props.courses}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
         />

         <Box
            component={'form'}
            onSubmit={handleSubmit(bookHandler)}
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
                        label='نام دوره'
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
               name='price'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        label='قیمت (ریال)'
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
               name='duration'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        label='مدت دوره'
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

export default CourseForm;
