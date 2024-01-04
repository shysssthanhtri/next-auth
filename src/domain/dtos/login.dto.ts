import { z } from 'zod';

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type TLoginDto = z.infer<typeof LoginDto>;
