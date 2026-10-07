import assert from 'node:assert/strict';
const base = process.env.API_URL || 'http://localhost:3000/api';
const created = [];
async function req(method, path, body, expected) {
  const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const text = await response.text();
  assert.equal(response.status, expected, `${method} ${path}: ${text}`);
  return text ? JSON.parse(text) : null;
}
async function add(resource, data) {
  const item = await req('POST', '/' + resource, data, 201);
  created.push([resource, item.id]);
  return item;
}
try {
  const imovelId = Math.floor(Math.random() * 2000000000) + 1;
  const charge = { imovelId, competencia: '2099-01-01', valor: 500, vencimento: '2099-01-10' };
  const c = await add('cobrancas', charge);
  await req('POST', '/cobrancas', charge, 409);
  await req('POST', '/cobrancas', { ...charge, valor: -1 }, 400);
  await req('POST', '/cobrancas', { ...charge, competencia: '2099-02-30' }, 400);
  await req('POST', '/cobrancas', { ...charge, extra: true }, 400);
  await req('PATCH', '/cobrancas/' + c.id, { valor: null }, 400);
  await req('GET', '/cobrancas?limit=0', undefined, 400);
  const b = await add('boletos', { cobrancaId: c.id });
  await req('POST', '/boletos', { cobrancaId: c.id }, 409);
  const p = await add('pagamentos', { cobrancaId: c.id, valorPago: 100, dataPagamento: '2026-10-06T12:00:00Z', formaPagamento: 'PIX' });
  const r = await add('receitas', { descricao: 'Teste', valor: 200, data: '2026-10-06' });
  const d = await add('despesas', { descricao: 'Teste', valor: 50, data: '2026-10-06' });
  for (const [resource, item, patch, key] of [
    ['cobrancas', c, { descricao: 'Atualizada' }, 'descricao'],
    ['boletos', b, { codigoBarras: 'TESTE' }, 'codigoBarras'],
    ['pagamentos', p, { observacao: 'Atualizada' }, 'observacao'],
    ['receitas', r, { descricao: 'Atualizada' }, 'descricao'],
    ['despesas', d, { descricao: 'Atualizada' }, 'descricao'],
  ]) {
    assert(Array.isArray(await req('GET', `/${resource}?page=1&limit=10`, undefined, 200)));
    assert.equal((await req('GET', `/${resource}/${item.id}`, undefined, 200)).id, item.id);
    assert.equal((await req('PATCH', `/${resource}/${item.id}`, patch, 200))[key], patch[key]);
  }
  await req('DELETE', '/cobrancas/' + c.id, undefined, 204);
  await req('GET', '/cobrancas/' + c.id, undefined, 404);
  await req('GET', '/boletos/' + b.id, undefined, 404);
  await req('GET', '/pagamentos/' + p.id, undefined, 404);
  await req('POST', '/pagamentos', { cobrancaId: c.id, valorPago: 10, dataPagamento: '2026-10-06T12:00:00Z', formaPagamento: 'PIX' }, 400);
  for (const [resource, item] of [['receitas', r], ['despesas', d]]) {
    await req('DELETE', `/${resource}/${item.id}`, undefined, 204);
    await req('GET', `/${resource}/${item.id}`, undefined, 404);
  }
  // Exclusão direta dos recursos dependentes em uma segunda cobrança.
  const c2 = await add('cobrancas', { ...charge, competencia: '2099-02-01' });
  for (const [resource, body] of [['boletos', { cobrancaId: c2.id }], ['pagamentos', { cobrancaId: c2.id, valorPago: 10, dataPagamento: '2026-10-06T12:00:00Z', formaPagamento: 'PIX' }]]) {
    const item = await add(resource, body);
    await req('DELETE', `/${resource}/${item.id}`, undefined, 204);
    await req('GET', `/${resource}/${item.id}`, undefined, 404);
  }
  console.log('OK: cinco CRUDs, validação, conflito, FK e cascata.');
} finally {
  for (const [resource, id] of created.reverse()) {
    try { await fetch(`${base}/${resource}/${id}`, { method: 'DELETE' }); } catch {}
  }
}
