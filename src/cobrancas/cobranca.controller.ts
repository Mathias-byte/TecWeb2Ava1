import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CobrancaService } from './cobranca.service';
import { CreateCobrancaDto, UpdateCobrancaDto } from './cobranca.dto';
import { PaginationDto } from '../common/pagination.dto';
@Controller('cobrancas')
@ApiTags('cobrancas')
export class CobrancaController {
  constructor(private readonly service: CobrancaService) {}
  @Post() @ApiOperation({ summary: 'Cadastrar cobranca' })
  create(@Body() dto: CreateCobrancaDto) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'Listar cobrancas' })
  findAll(@Query() query: PaginationDto) { return this.service.findAll(query.page, query.limit); }
  @Get(':id') @ApiOperation({ summary: 'Consultar pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Alterar registro' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCobrancaDto) { return this.service.update(id, dto); }
  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Excluir registro' })
  async remove(@Param('id', ParseIntPipe) id: number) { await this.service.remove(id); }
}
