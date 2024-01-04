'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { homeRoute } from '@/config/routes';
import { LoginDto, TLoginDto } from '@/domain/dtos/login.dto';
import { BaseResponse } from '@/shared/types/base-response.action';

type LoginData = {
  accessToken: string;
};

export const login = async (
  dto: TLoginDto,
): Promise<BaseResponse<LoginData>> => {
  const validatedDto = LoginDto.safeParse(dto);
  if (!validatedDto.success) {
    return {
      error: 'Invalid request dto',
    };
  }

  const { email, password } = validatedDto.data;
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirectTo: homeRoute,
    });
    console.log(result);
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return {
          error: 'Invalid credentials',
        };
      }
      return {
        error: 'Something went wrong!',
      };
    }
    throw error;
  }
};
