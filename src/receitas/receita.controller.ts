import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto, UpdateReceitaDto } from './receita.dto';
import { PaginationDto } from '../common/pagination.dto';
@Controller('receitas')
@ApiTags('receitas')
export class ReceitaController {
  constructor(private readonly service: ReceitaService) {}
  @Post() @ApiOperation({ summary: 'Cadastrar receita' })
  create(@Body() dto: CreateReceitaDto) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'Listar receitas' })
  findAll(@Query() query: PaginationDto) { return this.service.findAll(query.page, query.limit); }
  @Get(':id') @ApiOperation({ summary: 'Consultar pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Alterar registro' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateReceitaDto) { return this.service.update(id, dto); }
  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Excluir registro' })
  async remove(@Param('id', ParseIntPipe) id: number) { await this.service.remove(id); }
}
