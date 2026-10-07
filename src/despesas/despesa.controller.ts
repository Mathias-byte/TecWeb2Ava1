import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto, UpdateDespesaDto } from './despesa.dto';
import { PaginationDto } from '../common/pagination.dto';
@Controller('despesas')
@ApiTags('despesas')
export class DespesaController {
  constructor(private readonly service: DespesaService) {}
  @Post() @ApiOperation({ summary: 'Cadastrar despesa' })
  create(@Body() dto: CreateDespesaDto) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'Listar despesas' })
  findAll(@Query() query: PaginationDto) { return this.service.findAll(query.page, query.limit); }
  @Get(':id') @ApiOperation({ summary: 'Consultar pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Alterar registro' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDespesaDto) { return this.service.update(id, dto); }
  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Excluir registro' })
  async remove(@Param('id', ParseIntPipe) id: number) { await this.service.remove(id); }
}
