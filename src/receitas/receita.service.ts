import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReceitaDto, UpdateReceitaDto } from './receita.dto';
@Injectable()
export class ReceitaService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateReceitaDto) {
    return this.prisma.receita.create({ data: { ...dto, ...(dto.data !== undefined ? { data: new Date(dto.data) } : {}) } as Prisma.ReceitaUncheckedCreateInput });
  }
  findAll(page: number, limit: number) {
    return this.prisma.receita.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { id: 'desc' } });
  }
  async findOne(id: number) {
    const item = await this.prisma.receita.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Registro não encontrado.');
    return item;
  }
  update(id: number, dto: UpdateReceitaDto) {
    return this.prisma.receita.update({ where: { id }, data: { ...dto, ...(dto.data !== undefined ? { data: new Date(dto.data) } : {}) } as Prisma.ReceitaUncheckedUpdateInput });
  }
  remove(id: number) { return this.prisma.receita.delete({ where: { id } }); }
}
