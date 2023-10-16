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
import { Schedule } from '../forms/ScheduleForm';
import SchedulesModal from '../modals/SchedulesModal';

type SchedulesProps = {
  schedules: Schedule[];
  selectedItem?: Schedule;
  setSelectedItem: (schedule?: Schedule) => void;
};

export default function Schedules(props: SchedulesProps) {
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
              <TableCell align='center'>نام کار/کلاس</TableCell>
              <TableCell align='center'>مکان</TableCell>
              <TableCell align='center'>زمان</TableCell>
              <TableCell align='center'>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.schedules?.map((s) => {
              const isActive = props.selectedItem?._id === s._id;

              return (
                <TableRow
                  key={s.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell align='center'>{s.name}</TableCell>
                  <TableCell align='center'>{s.place}</TableCell>
                  <TableCell align='center'>{s.time}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      onClick={() => {
                        if (isActive) return props.setSelectedItem(undefined);

                        props.setSelectedItem({
                          _id: s._id,
                          place: s.place,
                          name: s.name,
                          time: s.time,
                        });
                      }}
                      color={isActive ? 'error' : 'info'}
                    >
                      {isActive ? <Close /> : <Edit />}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteSelected(s._id);
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
      <SchedulesModal
        deleteSelected={deleteSelected}
        setDeleteSelected={setDeleteSelected}
      />
    </Box>
  );
}
