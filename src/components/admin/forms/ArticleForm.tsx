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
import articleValidation from '@/validations/articleValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CardType } from '@/store/store';
import { addArticleAction, editArticleAction } from '@/actions/articleActions';
import Articles from '../tables/Articles';

export type ArticleFormProps = {
   articles: CardType[];
};
export type ArticleType = z.infer<typeof articleValidation>;

const ArticleForm = (props: ArticleFormProps) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [selectedItem, setSelectedItem] = useState<CardType>();

   const { control, handleSubmit, reset } = useForm<ArticleType>({
      resolver: zodResolver(articleValidation),
      values: selectedItem
         ? {
              name: selectedItem.name,
              image: selectedItem.image,
              reference: selectedItem.reference,
           }
         : { image: '', name: '', reference: '' },
   });

   async function articleHandler(value: ArticleType) {
      setLoading(true);
      let response;
      if (!selectedItem) {
         response = await addArticleAction(
            localStorage.getItem('token')!,
            value,
         );
      } else {
         response = await editArticleAction(
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
            return alert('مقاله با موفقیت ویرایش شد');
         }
         alert('مقاله با موفقیت اضافه شد');
      }
   }

   return (
      <>
         <Typography variant='h6'>اضافه کردن مقاله</Typography>

         <Articles
            articles={props.articles}
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
                        label='نام مقاله'
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

export default ArticleForm;
