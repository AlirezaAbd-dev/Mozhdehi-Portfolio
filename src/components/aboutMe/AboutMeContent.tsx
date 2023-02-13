"use client";
import { Avatar, Box, Skeleton, Slide } from "@mui/material";
import { useEffect, useState } from "react";

import DevInfo from "@/page-components/DevInfo";
import avatar from "../../assets/avatar.jpg";
import Image from "next/image";

const AboutMeContent = () => {
  const [loading, setLoading] = useState(false);

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
          width: "100%",
          my: 2,
          justifyContent: "flex-end",
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        {!avatar ? <Skeleton variant="circular" animation="pulse" width={150} height={150} />:(
          <Avatar variant="circular" sx={{ width: 150, height: "auto" }}>
          <Image
            priority
            src={avatar}
            alt="علیرضا عابدی"
            width={150}
            height={150}
            />
        </Avatar>
            )}
      </Box>
      <Slide
        direction="right"
        in={loading}
        style={{
          transitionDelay: loading ? "500ms" : "0ms",
        }}
      >
        <Box>
          <DevInfo>نام و نام خانوادگی : علیرضا عابدی</DevInfo>
          <DevInfo>سال تولد : ۱۳۸۲</DevInfo>
          {/* <DevInfo>سن : 19</DevInfo> */}
          <DevInfo>شهر : رشت</DevInfo>
          <DevInfo>alireza.abedi9310@gmail.com : ایمیل</DevInfo>
        </Box>
      </Slide>
    </>
  );
};

export default AboutMeContent;