import { NextRequest, NextResponse as res } from 'next/server';

import { adminAuth } from '../../auth/auth';
import dbConnect from '../../utils/dbConnect';
import UserModel from '../../models/UserModel';
import scheduleValidation from './scheduleValidation';

export async function GET() {
   await dbConnect();

   const users = await UserModel.find();

   if (!users.at(0)) {
      return res.json(
         { message: 'داده ای برای نمایش وجود ندارد!' },
         { status: 404 },
      );
   }

   const schedules = users.at(0)?.schedules;

   return res.json({ schedules });
}

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof scheduleValidation>(
      req,
      scheduleValidation,
   );

   if (data instanceof res) {
      return data;
   }

   data.users.at(0)?.schedules.push({ ...data.verifiedBody.data });

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
