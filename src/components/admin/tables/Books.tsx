'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';
import { CardType } from '@/store/store';
import BooksModal from '../modals/BooksModal';

type BooksProps = {
   books: CardType[];
   selectedItem?: CardType;
   setSelectedItem: (books?: CardType) => void;
};

export default function Books(props: BooksProps) {
   const [deleteSelected, setDeleteSelected] = useState<string>();

   return (
      <Box width={'100%'}>
         <TableContainer component={Paper}>
            <Table
               sx={{ minWidth: 650 }}
               aria-label='simple table'
            >
               <TableHead>
                  <TableRow>
                     <TableCell align='center'>نام کتاب</TableCell>
                     <TableCell align='center'>آدرس عکس</TableCell>
                     <TableCell align='center'>لینک رفرنس</TableCell>
                     <TableCell align='center'>عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {props?.books?.map((b) => {
                     const isActive = props.selectedItem?._id === b._id;

                     return (
                        <TableRow
                           key={b.name}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                           }}
                        >
                           <TableCell align='center'>{b.name}</TableCell>
                           <TableCell align='center'>{b.image}</TableCell>
                           <TableCell align='center'>{b.reference}</TableCell>
                           <TableCell align='center'>
                              <IconButton
                                 onClick={() => {
                                    if (isActive)
                                       return props.setSelectedItem(undefined);

                                    props.setSelectedItem({
                                       _id: b._id,
                                       image: b.image,
                                       name: b.name,
                                       reference: b.reference,
                                    });
                                 }}
                                 color={isActive ? 'error' : 'info'}
                              >
                                 {isActive ? <Close /> : <Edit />}
                              </IconButton>
                              <IconButton
                                 onClick={() => {
                                    setDeleteSelected(b._id);
                                 }}
                                 color='error'
                              >
                                 <Delete />
                              </IconButton>
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
         <BooksModal
            deleteSelected={deleteSelected}
            setDeleteSelected={setDeleteSelected}
         />
      </Box>
   );
}
