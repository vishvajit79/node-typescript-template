import { IsDefined, IsOptional, IsString, MinLength } from 'class-validator';

export class ExampleBody {
  @IsString()
  @MinLength(5)
  types!: string;

  @IsOptional({ groups: ['group2'] })
  @IsString({ groups: ['group2'] })
  @MinLength(5, { groups: ['group2'] })
  query?: string;
}

export class ExampleParams {
  @IsString({ groups: ['group1'] })
  @IsDefined()
  @MinLength(1, { groups: ['group1'] })
  source!: string;

  @IsOptional({ groups: ['group1'] })
  @IsString()
  @MinLength(5)
  example?: string;
}
