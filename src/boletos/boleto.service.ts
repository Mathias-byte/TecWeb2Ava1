import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoletoDto, UpdateBoletoDto } from './boleto.dto';
@Injectable()
export class BoletoService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateBoletoDto) {
    return this.prisma.boleto.create({ data: { ...dto } as Prisma.BoletoUncheckedCreateInput });
  }
  findAll(page: number, limit: number) {
    return this.prisma.boleto.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { id: 'desc' } });
  }
  async findOne(id: number) {
    const item = await this.prisma.boleto.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Registro não encontrado.');
    return item;
  }
  update(id: number, dto: UpdateBoletoDto) {
    return this.prisma.boleto.update({ where: { id }, data: { ...dto } as Prisma.BoletoUncheckedUpdateInput });
  }
  remove(id: number) { return this.prisma.boleto.delete({ where: { id } }); }
}
