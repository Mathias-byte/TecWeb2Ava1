import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDespesaDto, UpdateDespesaDto } from './despesa.dto';
@Injectable()
export class DespesaService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateDespesaDto) {
    return this.prisma.despesa.create({ data: { ...dto, ...(dto.data !== undefined ? { data: new Date(dto.data) } : {}) } as Prisma.DespesaUncheckedCreateInput });
  }
  findAll(page: number, limit: number) {
    return this.prisma.despesa.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { id: 'desc' } });
  }
  async findOne(id: number) {
    const item = await this.prisma.despesa.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Registro não encontrado.');
    return item;
  }
  update(id: number, dto: UpdateDespesaDto) {
    return this.prisma.despesa.update({ where: { id }, data: { ...dto, ...(dto.data !== undefined ? { data: new Date(dto.data) } : {}) } as Prisma.DespesaUncheckedUpdateInput });
  }
  remove(id: number) { return this.prisma.despesa.delete({ where: { id } }); }
}
