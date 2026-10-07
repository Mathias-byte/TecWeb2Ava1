# Validação desta entrega

Executado neste ambiente:
- prisma validate: schema válido.
- prisma generate: Prisma Client 6.19 gerado.
- npm run build: compilação TypeScript sem erros.
- Validação dos DTOs de cobrança: criação e atualização válidas aceitas; valor negativo, mais de duas casas decimais, data impossível, ID zero, enum inválido, campo extra e valor nulo rejeitados.

Não executado: testes HTTP contra MySQL. O ambiente de criação não possui servidor MySQL/Docker instalado. O script scripts/test-crud.mjs foi incluído para executar essa verificação com npm run test:crud após iniciar banco e API. Não se afirma validação de persistência real nesta entrega.
