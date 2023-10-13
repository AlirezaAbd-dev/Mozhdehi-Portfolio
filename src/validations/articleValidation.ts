import { z } from 'zod';

export default z.object({
   name: z
      .string({ required_error: 'نام مقاله خود را وارد نمایید!' })
      .nonempty({ message: 'نام مقاله خود را وارد نمایید!' }),
   image: z
      .string({ required_error: 'آدرس عکس مقاله خود را وارد نمایید!' })
      .url({ message: 'لطفا آدرس عکس را به درستی وارد نمایید!' }),
   reference: z.preprocess((arg) => {
      if (!arg || typeof arg !== 'string') return undefined;
      return arg === '' ? undefined : arg;
   }, z.string().url({ message: 'لطفا ادرس رفرنس را به درستی وارد نمایید!' }).optional()),
});
