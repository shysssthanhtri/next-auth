import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession } from 'next-auth';

import authConfig from '@/auth.config';
import { TUserEntity } from '@/domain/entities/user.entity';
import { db } from '@/lib/db';

declare module 'next-auth' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface Session {
    user: {
      role: TUserEntity['role'];
    } & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await db.user.findUnique({ where: { id: token.sub } });
      if (!user) return token;
      token.role = user.role;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as TUserEntity['role'];
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
