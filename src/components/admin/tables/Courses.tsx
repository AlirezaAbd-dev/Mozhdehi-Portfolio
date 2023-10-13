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
import { Course } from '../forms/CourseForm';
import CoursesModal from '../modals/CoursesModal';

type CoursesProps = {
   courses: Course[];
   selectedItem?: Course;
   setSelectedItem: (course?: Course) => void;
};

export default function Courses(props: CoursesProps) {
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
                     <TableCell align='center'>نام دوره</TableCell>
                     <TableCell align='center'>قیمت دوره</TableCell>
                     <TableCell align='center'>مدت دوره</TableCell>
                     <TableCell align='center'>عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {props?.courses?.map((c) => {
                     const isActive = props.selectedItem?._id === c._id;

                     return (
                        <TableRow
                           key={c.name}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                           }}
                        >
                           <TableCell align='center'>{c.name}</TableCell>
                           <TableCell align='center'>{c.price} ریال</TableCell>
                           <TableCell align='center'>{c.duration}</TableCell>
                           <TableCell align='center'>
                              <IconButton
                                 onClick={() => {
                                    if (isActive)
                                       return props.setSelectedItem(undefined);

                                    props.setSelectedItem({
                                       _id: c._id,
                                       price: c.price,
                                       name: c.name,
                                       duration: c.duration,
                                    });
                                 }}
                                 color={isActive ? 'error' : 'info'}
                              >
                                 {isActive ? <Close /> : <Edit />}
                              </IconButton>
                              <IconButton
                                 onClick={() => {
                                    setDeleteSelected(c._id);
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
         <CoursesModal
            deleteSelected={deleteSelected}
            setDeleteSelected={setDeleteSelected}
         />
      </Box>
   );
}
