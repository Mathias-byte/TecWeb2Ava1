# Projeto Integrador V — Backend Financeiro

Backend acadêmico do módulo Financeiro de Gestão de Condomínio. NestJS 11, TypeScript, Prisma 6.19 e MySQL 8. Prisma 6 foi fixado deliberadamente para manter a configuração simples com DATABASE_URL no schema; não troque apenas um dos pacotes Prisma para a versão 7/8.

## O que está pronto

CRUD de cobranças, boletos, pagamentos, receitas e despesas. Swagger interativo, DTOs com validação, paginação e respostas 400, 404 e 409. Somente backend, sem telas de frontend.

## Executar no Windows

1. Instale Node.js 22 LTS (ou 24) e um servidor MySQL 8. Se preferir, instale Docker Desktop para iniciar o banco com o compose incluído.
2. Extraia o ZIP e abra um terminal dentro da pasta `financeiro-api` (onde está package.json).
3. Copie a configuração:

```powershell
Copy-Item .env.example .env
```

4. Se usar Docker, execute:

```powershell
docker compose up -d --wait
```

O compose fornece MySQL na porta 3307, banco `20262M_prj5_condominio_financeiro`, usuário `financeiro` e senha `financeiro_dev`. Essas credenciais são somente para desenvolvimento local. Com MySQL já instalado, edite DATABASE_URL em `.env` com seu usuário, senha, porta e banco. Caracteres especiais na senha devem ser codificados para URL. Crie um banco vazio, sem importar o SQL original, para a instalação nova.

5. Instale dependências e prepare o projeto:

```powershell
npm ci
npm run setup
npm start
```

`setup` gera Prisma Client, cria as tabelas no banco indicado e compila TypeScript. Não exige Nest CLI global. O banco precisa estar acessível antes de executar setup. Para repetir a apresentação, apenas execute `npm start`.

Também é possível executar `iniciar-windows.bat` após preparar o banco e configurar `.env`.

6. Abra http://localhost:3000/docs. Expanda a operação, clique em **Try it out**, preencha o JSON e clique em **Execute**.

## Endpoints

Para cada recurso abaixo existem POST (cadastrar), GET (listar), GET /:id (consultar), PATCH /:id (alterar parcialmente) e DELETE /:id (excluir):

| Recurso | Rota |
| --- | --- |
| Cobranças | `/api/cobrancas` |
| Boletos | `/api/boletos` |
| Pagamentos | `/api/pagamentos` |
| Receitas | `/api/receitas` |
| Despesas | `/api/despesas` |

Listagem: `?page=1&limit=20`, com limite máximo 100. Os campos e exemplos aparecem no Swagger e em `exemplos.json`. IDs retornados devem ser reutilizados nas próximas requisições; não presuma que serão sempre 1.

### Demonstração rápida de cobrança

POST /api/cobrancas:

```json
{
  "imovelId": 1,
  "descricao": "Taxa condominial de outubro",
  "competencia": "2026-10-01",
  "valor": 500,
  "vencimento": "2026-10-10",
  "situacao": "PENDENTE"
}
```

Anote o `id`, liste, consulte por ID e altere com PATCH /api/cobrancas/ID:

```json
{ "descricao": "Taxa condominial atualizada", "valor": 550 }
```

Exclua pelo ID e consulte novamente para mostrar 404. DELETE bem-sucedido responde 204 sem corpo.

## Modelo e limites do escopo

- `@map` e `@@map` preservam tabelas e colunas do SQL enviado. `cobrancaId` em Pagamento aponta para a coluna original `cobrancas_id`. Não foi feita alteração nos arquivos enviados.
- `situacao` representa o enum original `cobranca_tipo`. O campo inteiro opcional `status` foi preservado sem atribuir um significado que não estava definido no material.
- Competência e outras datas DATE usam `AAAA-MM-DD`. Adote sempre dia 01 para competência mensal: a restrição original considera a data completa, e não apenas mês/ano.
- Valor monetário deve ser positivo, com até duas casas decimais. O banco usa DECIMAL(10,2); valores monetários retornam como strings JSON para preservar a precisão do Prisma.
- Um boleto por cobrança; vários pagamentos por cobrança. Crie a cobrança antes do boleto/pagamento. Imóvel é referência externa sem FK e sem consulta ao serviço de Imóveis nesta versão.
- Mantido o DELETE CASCADE do SQL: excluir cobrança também exclui boletos e pagamentos relacionados. Use dados de demonstração. Em uma evolução financeira real, revisar exclusão e auditoria.
- Boleto é apenas um cadastro; não há emissão bancária, geração de PDF, processamento real de PIX ou integração com banco.
- Registrar pagamento não atualiza automaticamente a situação da cobrança. Não há cálculo de saldo, resumo financeiro, integração com outros serviços nem autenticação/autorização. São evoluções fora do CRUD solicitado.
- A API escuta somente em localhost para demonstração. Não publique esta versão como sistema financeiro real.

## Organização

`src/main.ts`: inicialização, validação e Swagger.
`src/app.module.ts`: módulos da aplicação.
`src/prisma/`: conexão Prisma.
`src/cobrancas/`, `boletos/`, `pagamentos/`, `receitas/`, `despesas/`: controller, service, DTO e module de cada entidade.
`prisma/schema.prisma`: entidades, relações e mapeamento SQL.
`modelo-original.sql`: cópia de referência do SQL fornecido.

## Desenvolvimento e testes

Depois de alterar código: `npm run build`, seguido de `npm start`. Para compilação contínua, `npm run start:dev` em outro terminal; reinicie `npm start` para carregar alterações (o comando de watch só compila).

Com a API rodando contra um banco de teste, execute `npm run test:crud`. O teste cria dados temporários, verifica os cinco CRUDs, validações, conflitos, FK e cascata e limpa os registros criados. Não execute em banco de produção.

Para visualizar o banco: `npx prisma studio`. Para parar o banco Docker: `docker compose down` (preserva o volume).

## Referências técnicas

https://docs.nestjs.com/recipes/prisma
https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping
