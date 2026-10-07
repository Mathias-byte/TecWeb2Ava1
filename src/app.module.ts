import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CobrancaModule } from './cobrancas/cobranca.module';
import { BoletoModule } from './boletos/boleto.module';
import { PagamentoModule } from './pagamentos/pagamento.module';
import { ReceitaModule } from './receitas/receita.module';
import { DespesaModule } from './despesas/despesa.module';
@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, CobrancaModule, BoletoModule, PagamentoModule, ReceitaModule, DespesaModule] })
export class AppModule {}
