import { adminAuth } from '@/app/api/auth/auth';
import dbConnect from '@/app/api/utils/dbConnect';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse as res } from 'next/server';

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split('/')[3];

  const data = await adminAuth(req, null);

  if (data instanceof res) {
    return data;
  }

  data.users[0].orders = data.users[0].orders?.filter(
    (e) => e._id?.toString() !== id,
  );

  try {
    await data.users.at(0)?.save();
    revalidateTag('orders');
    return res.json({ status: 'done' });
  } catch (err: any) {
    return res.json({ message: err.message }, { status: 500 });
  }
}
