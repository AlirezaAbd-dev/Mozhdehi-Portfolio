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
import { Work } from '../forms/WorkForm';
import WorksModal from '../modals/WorksModal';

type WorkProps = {
  works: Work[];
  selectedItem?: Work;
  setSelectedItem: (work?: Work) => void;
};

export default function Works(props: WorkProps) {
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
              <TableCell align='center'>نام شرکت</TableCell>
              <TableCell align='center'>سمت</TableCell>
              <TableCell align='center'>زمان</TableCell>
              <TableCell align='center'>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.works?.map((w) => {
              const isActive = props.selectedItem?._id === w._id;

              return (
                <TableRow
                  key={w._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell align='center'>{w.company}</TableCell>
                  <TableCell align='center'>{w.post}</TableCell>
                  <TableCell align='center'>{w.time}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      onClick={() => {
                        if (isActive) return props.setSelectedItem(undefined);

                        props.setSelectedItem({
                          _id: w._id,
                          company: w.company,
                          post: w.post,
                          time: w.time,
                        });
                      }}
                      color={isActive ? 'error' : 'info'}
                    >
                      {isActive ? <Close /> : <Edit />}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteSelected(w._id);
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
      <WorksModal
        deleteSelected={deleteSelected}
        setDeleteSelected={setDeleteSelected}
      />
    </Box>
  );
}
