import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto, UpdatePagamentoDto } from './pagamento.dto';
import { PaginationDto } from '../common/pagination.dto';
@Controller('pagamentos')
@ApiTags('pagamentos')
export class PagamentoController {
  constructor(private readonly service: PagamentoService) {}
  @Post() @ApiOperation({ summary: 'Cadastrar pagamento' })
  create(@Body() dto: CreatePagamentoDto) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'Listar pagamentos' })
  findAll(@Query() query: PaginationDto) { return this.service.findAll(query.page, query.limit); }
  @Get(':id') @ApiOperation({ summary: 'Consultar pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Alterar registro' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePagamentoDto) { return this.service.update(id, dto); }
  @Delete(':id') @HttpCode(204) @ApiOperation({ summary: 'Excluir registro' })
  async remove(@Param('id', ParseIntPipe) id: number) { await this.service.remove(id); }
}
