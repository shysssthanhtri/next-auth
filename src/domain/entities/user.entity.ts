import { z } from 'zod';

import { UserModel } from '@/domain/schemas/zod';

export const UserEntity = z.object(UserModel.shape).extend({
  email: z.string().email(),
});
export type TUserEntity = z.infer<typeof UserEntity>;
