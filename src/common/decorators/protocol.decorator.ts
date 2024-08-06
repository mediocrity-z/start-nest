import { createParamDecorator } from '@nestjs/common';

export const protocol = createParamDecorator((defaultValue: string, ctx) => {
  console.log(defaultValue);

  const req = ctx.switchToHttp().getRequest();
  return req.protocol;
});
