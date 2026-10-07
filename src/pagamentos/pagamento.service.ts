import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePagamentoDto, UpdatePagamentoDto } from './pagamento.dto';
@Injectable()
export class PagamentoService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreatePagamentoDto) {
    return this.prisma.pagamento.create({ data: { ...dto, ...(dto.dataPagamento !== undefined ? { dataPagamento: new Date(dto.dataPagamento) } : {}) } as Prisma.PagamentoUncheckedCreateInput });
  }
  findAll(page: number, limit: number) {
    return this.prisma.pagamento.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { id: 'desc' } });
  }
  async findOne(id: number) {
    const item = await this.prisma.pagamento.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Registro não encontrado.');
    return item;
  }
  update(id: number, dto: UpdatePagamentoDto) {
    return this.prisma.pagamento.update({ where: { id }, data: { ...dto, ...(dto.dataPagamento !== undefined ? { dataPagamento: new Date(dto.dataPagamento) } : {}) } as Prisma.PagamentoUncheckedUpdateInput });
  }
  remove(id: number) { return this.prisma.pagamento.delete({ where: { id } }); }
}
