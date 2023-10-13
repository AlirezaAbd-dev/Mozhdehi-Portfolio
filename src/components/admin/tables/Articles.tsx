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
import ArticlesModal from '../modals/ArticlesModal';

type ArticlesProps = {
   articles: CardType[];
   selectedItem?: CardType;
   setSelectedItem: (article?: CardType) => void;
};

export default function Articles(props: ArticlesProps) {
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
                     <TableCell align='center'>نام مقاله</TableCell>
                     <TableCell align='center'>آدرس عکس</TableCell>
                     <TableCell align='center'>لینک رفرنس</TableCell>
                     <TableCell align='center'>عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {props?.articles?.map((a) => {
                     const isActive = props.selectedItem?._id === a._id;

                     return (
                        <TableRow
                           key={a.name}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                           }}
                        >
                           <TableCell align='center'>{a.name}</TableCell>
                           <TableCell align='center'>{a.image}</TableCell>
                           <TableCell align='center'>{a.reference}</TableCell>
                           <TableCell align='center'>
                              <IconButton
                                 onClick={() => {
                                    if (isActive)
                                       return props.setSelectedItem(undefined);

                                    props.setSelectedItem({
                                       _id: a._id,
                                       image: a.image,
                                       name: a.name,
                                       reference: a.reference,
                                    });
                                 }}
                                 color={isActive ? 'error' : 'info'}
                              >
                                 {isActive ? <Close /> : <Edit />}
                              </IconButton>
                              <IconButton
                                 onClick={() => {
                                    setDeleteSelected(a._id);
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
         <ArticlesModal
            deleteSelected={deleteSelected}
            setDeleteSelected={setDeleteSelected}
         />
      </Box>
   );
}
