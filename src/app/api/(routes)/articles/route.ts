import { NextRequest, NextResponse as res } from 'next/server';

import { adminAuth } from '../../auth/auth';
import dbConnect from '../../utils/dbConnect';
import UserModel from '../../models/UserModel';
import articleValidation from './articleValidation';

export async function GET() {
   await dbConnect();

   const users = await UserModel.find();

   if (!users.at(0)) {
      return res.json(
         { message: 'داده ای برای نمایش وجود ندارد!' },
         { status: 404 },
      );
   }

   const articles = users.at(0)?.articles;

   return res.json({ articles });
}

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof articleValidation>(
      req,
      articleValidation,
   );

   if (data instanceof res) {
      return data;
   }

   data.users.at(0)?.articles.push({ ...data.verifiedBody.data });

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
