import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaFilter } from './common/prisma.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new PrismaFilter());
  app.enableShutdownHooks();
  const config = new DocumentBuilder().setTitle('PI V — Financeiro').setDescription('CRUD acadêmico do módulo Financeiro de Gestão de Condomínio.').setVersion('1.0').build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(Number(process.env.PORT ?? 3000), '127.0.0.1');
  console.log('Swagger: http://localhost:' + (process.env.PORT ?? 3000) + '/docs');
}
bootstrap().catch(error => { console.error(error); process.exit(1); });
