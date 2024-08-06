import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  // 如果值不是正数抛出异常
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
