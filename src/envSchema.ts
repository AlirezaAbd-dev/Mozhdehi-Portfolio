import { z } from 'zod';

export default z.object({
  JWT_SECRET: z.string(),
  MONGODB_URI: z.string(),
  PORT: z.string(),
  NEXT_PUBLIC_PORT: z.string(),
});
