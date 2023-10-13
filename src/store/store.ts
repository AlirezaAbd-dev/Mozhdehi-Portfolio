'use client';

import { ReactNode, useEffect } from 'react';
import { ObjectId } from 'mongoose';
import { create } from 'zustand';

export type Store = {
   data: AllDataType | undefined;
   setAllData: (data: AllDataType | undefined) => void;
};

export type CardType = {
   _id: string;
   name: string;
   image: string;
   reference?: string;
};

export type AllDataType = {
   name: string;
   yearOfBirth: number;
   city: string;
   email: string;
   phone: string;
   introductions: { text: string; _id: ObjectId }[];
   skills: { _id: string; name: string; rate: number }[];
   educations: {
      _id: string;
      certificate: string;
      duration: string;
      major: string;
      university: string;
   }[];
   projects: CardType[];
   articles: CardType[];
   books: CardType[];
   works: { _id: string; company: string; time: string; post: string }[];
   schedules: { _id: string; name: string; time: string; place: string }[];
   courses: {
      _id: string;
      name: string;
      price: number;
      duration: string;
   }[];
};

export const useStore = create<Store>()((set) => ({
   data: undefined,
   setAllData(data) {
      set({ data });
   },
}));

export const StoreContainer = (props: {
   data: AllDataType | undefined;
   children: ReactNode;
}) => {
   const setAllData = useStore((state) => state?.setAllData);

   useEffect(() => {
      setAllData(props.data);
   }, [props.data, setAllData]);

   return props.children;
};
