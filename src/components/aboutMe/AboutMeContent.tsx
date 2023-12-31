'use client';
import { useEffect, useState } from 'react';
import { Avatar, Box, Slide } from '@mui/material';
import Image from 'next/image';

import DevInfo from '../../page-components/DevInfo';
import avatar from '../../assets/avatar.png';
import { useStore } from '@/store/store';

const AboutMeContent = () => {
   const [loading, setLoading] = useState(false);

   const data = useStore((state) => state.data);

   useEffect(() => {
      setLoading(true);

      return () => {
         setLoading(false);
      };
   }, []);

   return (
      <>
         <Box
            sx={{
               width: '100%',
               my: 2,
               justifyContent: 'flex-end',
               display: {
                  xs: 'flex',
                  sm: 'flex',
                  md: 'none',
                  lg: 'none',
                  xl: 'none',
               },
            }}
         >
            <Avatar
               variant='circular'
               sx={{
                  display: 'block',
                  width: 150,
                  height: 'auto',
               }}
            >
               <Image
                  priority
                  src={avatar}
                  alt={data?.name || ''}
                  width={150}
                  height={150}
               />
            </Avatar>
         </Box>
         <Slide
            direction='right'
            in={loading}
            style={{
               transitionDelay: loading ? '500ms' : '0ms',
            }}
         >
            <Box>
               <DevInfo>نام و نام خانوادگی : {data?.name || 'بی نام'}</DevInfo>
               <DevInfo>سال تولد : {data?.yearOfBirth || 'نامشخص'}</DevInfo>
               <DevInfo>شهر : {data?.city || 'نامشخص'}</DevInfo>
               <DevInfo>{data?.phone || 'نامشخص'} : شماره تلفن</DevInfo>
               <DevInfo>{data?.email || 'نامشخص'} : ایمیل</DevInfo>
            </Box>
         </Slide>
      </>
   );
};

export default AboutMeContent;
