'use client';

import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Informations from './forms/Informations';
import IntroductionForm from './forms/IntroductionForm';
import SkillForm from './forms/SkillForm';
import EducationForm from './forms/EducationForm';
import ProjectForm from './forms/ProjectForm';
import MainContext from '@/context/index';
import { useStore } from '@/store/store';
import CustomTabPanel from './CustomTabPanel';
import ArticleForm from './forms/ArticleForm';
import BookForm from './forms/BookForm';
import CourseForm from './forms/CourseForm';
import ScheduleForm from './forms/ScheduleForm';

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

const AdminPanel = () => {
   const data = useStore((state) => state.data);
   const [value, setValue] = React.useState(0);

   const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const { handlePageNumber } = useContext(MainContext);

   useEffect(() => {
      handlePageNumber.call(null, undefined, 4);
   }, [handlePageNumber]);

   if (!data) return <CircularProgress />;

   return (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-end',
            width: '100%',
            height: '100vh',
            p: 5,
            overflowY: 'scroll',
         }}
      >
         <Box
            width={'100%'}
            textAlign={'center'}
         >
            <Typography variant='h5'>پنل ادمین</Typography>
         </Box>

         <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <Tabs
                  dir='rtl'
                  value={value}
                  variant='scrollable'
                  scrollButtons={'auto'}
                  allowScrollButtonsMobile={true}
                  onChange={handleChange}
                  aria-label='تب پنل ادمین'
               >
                  <Tab
                     label='مشخصات'
                     {...a11yProps(0)}
                  />
                  <Tab
                     label='معرفی ها'
                     {...a11yProps(1)}
                  />
                  <Tab
                     label='مهارت ها'
                     {...a11yProps(2)}
                  />
                  <Tab
                     label='تحصیلات'
                     {...a11yProps(3)}
                  />
                  <Tab
                     label='پروژه ها'
                     {...a11yProps(4)}
                  />
                  <Tab
                     label='مقاله ها'
                     {...a11yProps(5)}
                  />
                  <Tab
                     label='کتاب ها'
                     {...a11yProps(6)}
                  />
                  <Tab
                     label='دوره ها'
                     {...a11yProps(7)}
                  />
                  <Tab
                     label='کلاسها/کارها'
                     {...a11yProps(8)}
                  />
                  <Tab
                     label='سوابق کاری'
                     {...a11yProps(9)}
                  />
                  <Tab
                     label='دوره های ثبت نامی'
                     {...a11yProps(10)}
                  />
               </Tabs>
            </Box>
            <CustomTabPanel
               value={value}
               index={0}
            >
               <Informations
                  city={data?.city}
                  email={data?.email}
                  name={data?.name}
                  yearOfBirth={data?.yearOfBirth}
                  phone={data?.phone}
               />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={1}
            >
               <IntroductionForm introductions={data.introductions} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={2}
            >
               <SkillForm skills={data.skills} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={3}
            >
               <EducationForm educations={data.educations} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={4}
            >
               <ProjectForm projects={data.projects} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={5}
            >
               <ArticleForm articles={data.articles} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={6}
            >
               <BookForm books={data.books} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={7}
            >
               <CourseForm courses={data.courses} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={8}
            >
               <ScheduleForm schedules={data.schedules} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={9}
            >
               <ProjectForm projects={data.projects} />
            </CustomTabPanel>
            <CustomTabPanel
               value={value}
               index={10}
            >
               <ProjectForm projects={data.projects} />
            </CustomTabPanel>
         </Box>

         {/* Articles */}
         {/* Books */}
         {/* courses */}
         {/* Schedules */}
         {/* Works */}
         {/* Orders */}
      </Card>
   );
};

export default AdminPanel;
