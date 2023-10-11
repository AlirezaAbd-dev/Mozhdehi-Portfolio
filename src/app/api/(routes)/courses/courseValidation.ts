import { z } from 'zod';

export default z.object({
   name: z.string({ required_error: 'نام دوره را وارد نمایید!' }),
   price: z.number({ required_error: 'قیمت دوره را وارد نمایید!' }),
   duration: z.string({ required_error: 'مدت زمان دوره را وارد نمایید!' }),
});
