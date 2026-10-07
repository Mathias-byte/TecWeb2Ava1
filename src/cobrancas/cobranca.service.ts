import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCobrancaDto, UpdateCobrancaDto } from './cobranca.dto';
@Injectable()
export class CobrancaService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateCobrancaDto) {
    return this.prisma.cobranca.create({ data: { ...dto, ...(dto.competencia !== undefined ? { competencia: new Date(dto.competencia) } : {}), ...(dto.vencimento !== undefined ? { vencimento: new Date(dto.vencimento) } : {}) } as Prisma.CobrancaUncheckedCreateInput });
  }
  findAll(page: number, limit: number) {
    return this.prisma.cobranca.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { id: 'desc' } });
  }
  async findOne(id: number) {
    const item = await this.prisma.cobranca.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Registro não encontrado.');
    return item;
  }
  update(id: number, dto: UpdateCobrancaDto) {
    return this.prisma.cobranca.update({ where: { id }, data: { ...dto, ...(dto.competencia !== undefined ? { competencia: new Date(dto.competencia) } : {}), ...(dto.vencimento !== undefined ? { vencimento: new Date(dto.vencimento) } : {}) } as Prisma.CobrancaUncheckedUpdateInput });
  }
  remove(id: number) { return this.prisma.cobranca.delete({ where: { id } }); }
}
