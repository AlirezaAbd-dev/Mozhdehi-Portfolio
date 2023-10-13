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
import { CardType } from '@/store/store';
import bookValidation from '@/validations/bookValidation';
import { addBookAction, editBookAction } from '@/actions/bookActions';
import Books from '../tables/Books';

export type BookFormProps = {
   books: CardType[];
};
export type BookType = z.infer<typeof bookValidation>;

const BookForm = (props: BookFormProps) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [selectedItem, setSelectedItem] = useState<CardType>();

   const { control, handleSubmit, reset } = useForm<BookType>({
      resolver: zodResolver(bookValidation),
      values: selectedItem
         ? {
              name: selectedItem.name,
              image: selectedItem.image,
              reference: selectedItem.reference,
           }
         : { image: '', name: '', reference: '' },
   });

   async function bookHandler(value: BookType) {
      setLoading(true);
      let response;
      if (!selectedItem) {
         response = await addBookAction(localStorage.getItem('token')!, value);
      } else {
         response = await editBookAction(
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
            return alert('کتاب با موفقیت ویرایش شد');
         }
         alert('کتاب با موفقیت اضافه شد');
      }
   }

   return (
      <>
         <Typography variant='h6'>اضافه کردن کتاب</Typography>

         <Books
            books={props.books}
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
                        label='نام کتاب'
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
               name='image'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        label='آدرس عکس'
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
               name='reference'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        label='لینک رفرنس'
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

export default BookForm;
