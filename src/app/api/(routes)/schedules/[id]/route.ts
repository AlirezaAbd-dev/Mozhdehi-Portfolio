import { adminAuth } from '@/app/api/auth/auth';
import dbConnect from '@/app/api/utils/dbConnect';
import { NextRequest, NextResponse as res } from 'next/server';
import scheduleValidation from '../scheduleValidation';

export async function PUT(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth<typeof scheduleValidation>(
      req,
      scheduleValidation,
   );

   if (data instanceof res) {
      return data;
   }

   const scheduleIndex = data.users[0].schedules.findIndex(
      (e) => e._id?.toString() === id,
   );

   if (scheduleIndex === -1) {
      return res.json({ message: 'مقاله مورد نظر یافت نشد!' }, { status: 404 });
   }

   data.users[0].schedules[scheduleIndex] = {
      ...data.users[0].schedules[scheduleIndex],
      ...data.verifiedBody.data,
   };

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}

export async function DELETE(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth(req, null);

   if (data instanceof res) {
      return data;
   }

   data.users[0].schedules = data.users[0].schedules.filter(
      (e) => e._id?.toString() !== id,
   );

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
