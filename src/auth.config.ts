import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginRoute } from '@/config/routes';
import { LoginDto } from '@/domain/dtos/login.dto';
import { db } from '@/lib/db';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginDto.safeParse(credentials);
        if (!validatedCredentials.success) return null;

        const { email, password } = validatedCredentials.data;
        const user = await db.user.findFirst({ where: { email } });
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;
        return user;
      },
    }),
  ],
  pages: {
    signIn: loginRoute,
  },
} satisfies NextAuthConfig;
