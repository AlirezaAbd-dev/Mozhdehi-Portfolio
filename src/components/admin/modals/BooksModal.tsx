import { deleteBookAction } from '@/actions/bookActions';
import {
   Box,
   Button,
   CircularProgress,
   Modal,
   Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type BooksModalProps = {
   deleteSelected: string | undefined;
   setDeleteSelected: (_id: string | undefined) => void;
};

const BooksModal = (props: BooksModalProps) => {
   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const deleteHandler = async () => {
      if (props.deleteSelected) {
         setLoading(true);
         const response = await deleteBookAction(
            localStorage.getItem('token')!,
            props.deleteSelected,
         );
         setLoading(false);

         if (response.status !== 200) {
            if (response.status === 401) {
               props.setDeleteSelected(undefined);
               localStorage.removeItem('token');
               router.replace('/');
            }

            return alert(response.message || 'خطایی در سرور رخ داد!');
         }

         if (response.status === 200) {
            props.setDeleteSelected(undefined);
            alert('کتاب مورد نظر با موفقیت حذف شد');
         }
      }
   };

   return (
      <Modal
         open={!!props.deleteSelected}
         onClose={() => props.setDeleteSelected(undefined)}
      >
         <Box
            sx={{
               position: 'absolute' as 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               width: 400,
               bgcolor: 'background.paper',
               border: '2px solid #000',
               boxShadow: 24,
               pt: 2,
               px: 4,
               pb: 3,
            }}
         >
            <Typography variant='h6'>
               آیا مایل به حذف این کتاب هستید؟
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
               <Button
                  onClick={() => {
                     props.setDeleteSelected(undefined);
                  }}
               >
                  لغو
               </Button>
               <Button
                  type='button'
                  onClick={deleteHandler}
                  color='error'
                  disabled={loading}
               >
                  {loading ? (
                     <CircularProgress
                        color='error'
                        size={25}
                     />
                  ) : (
                     'حذف'
                  )}
               </Button>
            </Box>
         </Box>
      </Modal>
   );
};

export default BooksModal;
