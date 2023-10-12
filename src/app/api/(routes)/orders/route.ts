import { NextRequest, NextResponse as res } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import UserModel from '../../models/UserModel';
import { adminAuth } from '../../auth/auth';
import orderValidation from './orderValidation';

export async function GET(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth(req, null);

   if (data instanceof res) {
      return data;
   }

   if (!data.users.at(0)) {
      return res.json(
         { message: 'داده ای برای نمایش وجود ندارد!' },
         { status: 404 },
      );
   }

   const orders = data.users.at(0)?.orders;

   return res.json({ orders });
}

export async function POST(req: NextRequest) {
   const body = await req.json();

   const verifiedBody = orderValidation.safeParse(body);

   if (!verifiedBody.success) {
      return res.json(
         { message: verifiedBody.error.errors[0].message },
         { status: 400 },
      );
   }

   const user = (await UserModel.find()).at(0);

   if (!user) {
      return res.json(
         { message: 'داده ای برای نمایش وجود ندارد!' },
         { status: 404 },
      );
   }

   const selectedCourse = user?.courses.find(
      (c) => c._id?.toString() === verifiedBody.data.courseId,
   );

   if (!selectedCourse) {
      return res.json({ message: 'دوره مورد نظر یافت نشد!' });
   }

   user?.orders.push({ ...verifiedBody.data, course: { ...selectedCourse } });

   try {
      await user.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
