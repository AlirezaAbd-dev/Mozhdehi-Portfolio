import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Course } from '../forms/CourseForm';
import { Delete } from '@mui/icons-material';
import OrdersModal from '../modals/OrdersModal';

export type Order = {
  _id: string;
  name: string;
  phone: string;
  age: number;
  freeTime: string;
  course: Course;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (token == null) {
        alert('شما به این بخش دسترسی ندارید!');
        router.replace('/');
        return;
      }

      setLoading(true);

      const response = await fetch(
        `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/orders`,
        {
          method: 'GET',
          headers: {
            token,
          },
          cache: 'force-cache',
          next: {
            tags: ['orders'],
          },
        },
      );

      setLoading(false);

      if (!response.ok) {
        if (response.status === 404) {
          alert('شما به این بخش دسترسی ندارید!');
          router.replace('/');
          return;
        }
        return alert(await response.json().then((res) => res.message));
      }
      const data: { orders: Order[] } = await response.json();
      setOrders(data.orders);
    })();
  }, [router]);

  if (loading) {
    return (
      <CircularProgress
        size={30}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
    );
  }

  if (!loading && orders && orders.length === 0) {
    return (
      <Typography
        variant='h5'
        sx={{ pt: 2, alignSelf: 'center' }}
      >
        هیچ ثبت نامی ثبت نشده
      </Typography>
    );
  }

  if (orders && orders?.length > 0)
    return (
      <Box width={'100%'}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label='simple table'
          >
            <TableHead>
              <TableRow>
                <TableCell align='center'>نام</TableCell>
                <TableCell align='center'>زمان آزاد</TableCell>
                <TableCell align='center'>شماره تلفن</TableCell>
                <TableCell align='center'>نام دوره</TableCell>
                <TableCell align='center'>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((o) => {
                return (
                  <TableRow
                    key={o.name}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align='center'>{o.name}</TableCell>
                    <TableCell align='center'>{o.age}</TableCell>
                    <TableCell align='center'>{o.phone}</TableCell>
                    <TableCell align='center'>{o.freeTime}</TableCell>
                    <TableCell align='center'>{o.course.name}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        onClick={() => {
                          setDeleteSelected(o._id);
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
        <OrdersModal
          deleteSelected={deleteSelected}
          setDeleteSelected={setDeleteSelected}
        />
      </Box>
    );
};

export default Orders;
