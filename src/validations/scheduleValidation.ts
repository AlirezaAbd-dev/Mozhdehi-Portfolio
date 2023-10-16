import { z } from 'zod';

export default z.object({
   name: z
      .string({ required_error: 'نام کار/کلاس را وارد نمایید!' })
      .nonempty({ message: 'نام کار/کلاس را وارد نمایید!' }),
   time: z
      .string({ required_error: 'زمان کار/کلاس را وارد نمایید!' })
      .nonempty({ message: 'نام کار/کلاس را وارد نمایید!' }),
   place: z
      .string({ required_error: 'مکان کار/کلاس را وارد نمایید!' })
      .nonempty({ message: 'نام کار/کلاس را وارد نمایید!' }),
});
