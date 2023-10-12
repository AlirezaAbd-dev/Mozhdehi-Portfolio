import { Box } from '@mui/material';

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

export default function CustomTabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   if (value === index)
      return (
         <Box
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'flex-end',
               gap: 2,
               mt: 2,
            }}
            {...other}
         >
            {children}
         </Box>
      );
}
