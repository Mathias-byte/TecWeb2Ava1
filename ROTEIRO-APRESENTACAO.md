# Roteiro de apresentação — Projeto Integrador V

Duração sugerida: 5 a 7 minutos. Leia os trechos de **Fala** e siga as ações em **Na tela**. Use os exemplos do README e substitua ID pelos IDs realmente retornados.

## 1. Abertura — 0:00 a 0:40

**Na tela:** pasta do projeto no VS Code e título do README.

**Fala:** “Olá, meu nome é Lucas. Nesta apresentação vou mostrar o backend do módulo Financeiro do nosso Projeto Integrador V, um sistema de Gestão de Condomínio. O objetivo desta etapa é implementar uma API REST simples, usando NestJS e Prisma, para cadastrar, consultar, atualizar e excluir dados financeiros.”

## 2. Tecnologias e estrutura — 0:40 a 1:30

**Na tela:** package.json, pastas de src e prisma/schema.prisma.

**Fala:** “O NestJS organiza a aplicação em módulos, controllers e services. Os controllers recebem as requisições HTTP, os services executam as operações e o Prisma faz a comunicação com o MySQL. Os DTOs definem e validam os dados recebidos. Também usamos Swagger para documentar e testar a API diretamente pelo navegador.”

“Implementei cinco recursos: cobranças, boletos, pagamentos, receitas e despesas. Cada recurso possui seu próprio módulo e as quatro operações do CRUD.”

## 3. Modelagem — 1:30 a 2:10

**Na tela:** modelos Cobranca, Boleto e Pagamento no schema.

**Fala:** “Uma cobrança referencia um imóvel por seu identificador. Como o imóvel pertence a outro domínio do sistema, ele aparece aqui apenas como uma referência externa. Uma cobrança pode possuir um boleto e vários pagamentos. O Prisma mantém os nomes das tabelas e das colunas do SQL original por meio do mapeamento. Por exemplo, o campo situacao na API corresponde a cobranca_tipo no banco.”

## 4. Executando a API — 2:10 a 2:40

**Na tela:** terminal com `npm start`, depois http://localhost:3000/docs.

**Fala:** “Depois de instalar as dependências e preparar as tabelas, iniciamos o backend com npm start. A documentação fica disponível em localhost, na porta 3000, no caminho docs. Aqui estão todas as rotas implementadas e os exemplos de dados.”

## 5. Demonstrando o CRUD — 2:40 a 4:40

**Na tela:** POST /api/cobrancas → Try it out. Cole o exemplo de cobrança do README. Execute e anote o ID.

**Fala:** “Primeiro, vou cadastrar uma cobrança. Informo o imóvel, a descrição, a competência, o valor e o vencimento. A API responde com status 201 e retorna o registro com o identificador gerado pelo banco.”

**Na tela:** GET /api/cobrancas e GET /api/cobrancas/{id}.

**Fala:** “Agora faço a consulta da lista de cobranças. Também posso buscar um registro específico pelo ID. Essas consultas retornam status 200. A listagem possui paginação para limitar a quantidade de resultados.”

**Na tela:** PATCH /api/cobrancas/{id}, com `{ "descricao": "Taxa condominial atualizada", "valor": 550 }`.

**Fala:** “Na atualização, uso o método PATCH. Ele permite alterar somente os campos necessários. Aqui atualizei a descrição e o valor. Ao consultar novamente, vemos os novos dados persistidos no banco.”

**Na tela:** DELETE /api/cobrancas/{id}, depois GET do mesmo ID.

**Fala:** “Por fim, excluo o registro. A API retorna status 204, sem conteúdo. Se tentar consultar o mesmo identificador, recebo 404, indicando que ele não foi encontrado. Assim demonstramos o ciclo completo do CRUD.”

## 6. Validações e outros recursos — 4:40 a 5:40

**Na tela:** tente cadastrar uma cobrança com valor -10. Mostre a resposta 400. Abra as seções de receitas e despesas no Swagger.

**Fala:** “A API também valida os dados. Valores negativos, datas inválidas e campos que não pertencem ao cadastro são rejeitados com status 400. As restrições do banco impedem cobranças duplicadas para o mesmo imóvel e competência. Os demais recursos seguem a mesma organização de CRUD.”

“Boletos e pagamentos precisam apontar para uma cobrança existente. Nesta versão, o boleto é somente um registro de dados: não existe integração bancária nem emissão de boleto real.”

## 7. Encerramento — 5:40 a 6:20

**Na tela:** visão geral do Swagger ou README.

**Fala:** “Esta entrega atende ao escopo de um backend com CRUD simples em NestJS e Prisma. O código está organizado por recurso e inclui documentação interativa e validações. Como próximos passos, podemos adicionar autenticação, integração com o serviço de Imóveis, regras automáticas de pagamento e o resumo financeiro. Obrigado por assistir.”

## Antes de gravar

- Prepare o banco e rode a API antes de iniciar a gravação.
- Use banco e registros de demonstração. Não mostre senhas do arquivo .env.
- Aumente a fonte do editor e o zoom do navegador para facilitar a leitura.
- Faça uma passagem completa do CRUD antes de gravar. Use os IDs retornados, sem fixar ID 1.
- Se já existir cobrança para imóvel 1 e competência 2026-10-01, use outro imóvel no exemplo.
- Evite afirmar que existe autenticação, emissão bancária ou atualização automática de situação, pois essas funções não fazem parte desta entrega.
