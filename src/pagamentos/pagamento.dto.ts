import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, Min, Max, IsString, MaxLength, IsNumber, IsEnum, IsDateString, IsUrl, Matches, ValidateIf } from 'class-validator';
import { SituacaoCobranca, FormaPagamento } from '@prisma/client';
export class CreatePagamentoDto {
  @ApiProperty({ example: 1 })
  @IsInt() @Min(1) @Max(4294967295)
  cobrancaId!: number;
  @ApiProperty({ example: 500 })
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01) @Max(99999999.99)
  valorPago!: number;
  @ApiProperty({ example: "2026-10-06T12:00:00.000Z" })
  @IsDateString({ strict: true })
  dataPagamento!: string;
  @ApiProperty({ example: "PIX", enum: FormaPagamento })
  @IsEnum(FormaPagamento)
  formaPagamento!: FormaPagamento;
  @ApiPropertyOptional({ example: "Pagamento de demonstra\u00e7\u00e3o" })
  @ValidateIf((_object, value) => value !== undefined) @IsString() @MaxLength(5000)
  observacao?: string;
  @ApiPropertyOptional({ example: 1 })
  @ValidateIf((_object, value) => value !== undefined) @IsInt() @Min(-2147483648) @Max(2147483647)
  status?: number;
}
export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto, { skipNullProperties: false }) {}
