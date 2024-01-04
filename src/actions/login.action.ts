'use server';

import { LoginDto, TLoginDto } from '@/domain/dtos/login.dto';
import { sleep } from '@/lib/utils';
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
  console.log(dto);
  await sleep(2);
  return {};
};
