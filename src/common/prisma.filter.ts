import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const codes: Record<string, [number, string]> = {
      P2002: [409, 'Já existe um registro com estes campos únicos.'],
      P2003: [400, 'A cobrança informada não existe ou possui vínculos que impedem esta operação.'],
      P2025: [404, 'Registro não encontrado.'],
    };
    const [statusCode, message] = codes[error.code] ?? [500, 'Falha ao acessar o banco de dados.'];
    host.switchToHttp().getResponse().status(statusCode).json({ statusCode, message });
  }
}
