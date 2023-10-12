import { z } from 'zod';

export default z.object({
   name: z.string({ required_error: 'نام خود را وارد نمایید!' }),
   phone: z
      .string({ required_error: 'شماره تلفن خود را وارد نمایید!' })
      .regex(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, {
         message: 'شماره تلفن را به درستی وارد نمایید!',
      }),
   age: z.number({ required_error: 'سن خود را وارد نمایید!' }),
   freeTime: z.string({ required_error: 'زمان آزاد خود را وارد نمایید!' }),
   courseId: z.string({ required_error: 'آیدی دوره مورد نظر را وارد نمایید!' }),
});
