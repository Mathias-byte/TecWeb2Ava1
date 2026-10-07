import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BoletoService } from './boleto.service';
import { CreateBoletoDto, UpdateBoletoDto } from './boleto.dto';
import { PaginationDto } from '../common/pagination.dto';
@Controller('boletos')
@ApiTags('boletos')
export class BoletoController {
  constructor(private readonly service: BoletoService) {}
  @Post() @ApiOperation({ summary: 'Cadastrar boleto' })
  create(@Body() dto: CreateBoletoDto) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'Listar boletos' })
  findAll(@Query() query: PaginationDto) { return this.service.findAll(query.page, query.limit); }
  @Get(':id') @ApiOperation({ summary: 'Consultar pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Alterar registro' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBoletoDto) { return this.service.update(id, dto); }
  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Excluir registro' })
  async remove(@Param('id', ParseIntPipe) id: number) { await this.service.remove(id); }
}
