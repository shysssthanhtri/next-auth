import { UserRole } from '@prisma/client';
import * as z from 'zod';

import { CompleteAccount, RelatedAccountModel } from './index';

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  password: z.string().nullish(),
  role: z.nativeEnum(UserRole),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    accounts: RelatedAccountModel.array(),
  }),
);
