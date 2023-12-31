import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import verifyToken from '../utils/verifyToken';
import { z } from 'zod';

export async function adminAuth<Tvalidation extends z.AnyZodObject>(
   req: NextRequest,
   validation: z.AnyZodObject | null,
) {
   const token = req.headers.get('token');
   const tokenVerified = verifyToken(token);

   if (tokenVerified === false) {
      return NextResponse.json(
         { message: 'شما اجازه دسترسی ندارید!' },
         { status: 401 },
      );
   }

   const users = await UserModel.find();
   if (users.length === 0) {
      return NextResponse.json(
         { message: 'شما اجازه دسترسی ندارید!' },
         { status: 401 },
      );
   }

   if ((tokenVerified as JwtPayload).username !== users.at(0)?.username) {
      return NextResponse.json(
         { message: 'شما اجازه دسترسی ندارید!' },
         { status: 401 },
      );
   }

   let body;
   if (validation != null) {
      try {
         body = await req.json();
      } catch (err: any) {
         return NextResponse.json(
            { message: 'لطفا داده json وارد نمایید!' },
            { status: 400 },
         );
      }
   }

   let verifiedBody;
   if (validation != null) {
      verifiedBody = validation.safeParse(body);
      if (!verifiedBody.success) {
         return NextResponse.json(
            { message: verifiedBody?.error?.errors[0]?.message },
            { status: 400 },
         );
      }
   }

   return {
      users,
      verifiedBody: verifiedBody as z.SafeParseSuccess<z.infer<Tvalidation>>,
   };
}
