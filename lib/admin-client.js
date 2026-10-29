// Cliente do painel de administração: fala apenas com as rotas /api/* protegidas.

const formatarData = (iso) => (iso ? new Intl.DateTimeFormat('pt-PT').format(new Date(iso)) : '');

async function pedir(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Pedido falhou (${res.status})`);
  return data;
}

async function enviarFicheiro(ficheiro) {
  const formData = new FormData();
  formData.append('file', ficheiro);
  return pedir('/api/upload', { method: 'POST', body: formData });
}

async function enviarImagens(imagens) {
  const lista = Array.isArray(imagens) ? imagens : [imagens];
  const urls = [];
  for (const imagem of lista) {
    if (imagem) urls.push((await enviarFicheiro(imagem)).url);
  }
  return urls;
}

const criar = (colecao, corpo) =>
  pedir(`/api/admin/${colecao}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });

const eliminar = (colecao, id) => pedir(`/api/admin/${colecao}/${id}`, { method: 'DELETE' });

// Documentos
export const getDocumentos = async () => {
  const lista = await pedir('/api/admin/documentos');
  return lista.map((d) => ({ ...d, title: d.titulo, category: d.categoria, createdAt: d.dataISO }));
};

export const adicionarDocumento = async (documento, ficheiro) => {
  const enviado = await enviarFicheiro(ficheiro);
  return criar('documentos', {
    ...documento,
    urlArquivo: enviado.url,
    tipoArquivo: enviado.format,
    tamanhoArquivo: enviado.bytes,
  });
};

export const eliminarDocumento = (id) => eliminar('documentos', id);

// Eventos
export const getEventos = async () => {
  const lista = await pedir('/api/admin/eventos');
  return lista.map((e) => ({ ...e, dataEvento: formatarData(e.dataEventoISO) }));
};

export const adicionarEvento = async (evento, imagens = []) =>
  criar('eventos', {
    ...evento,
    eventDate: new Date(evento.eventDate).toISOString(),
    urlsImagens: await enviarImagens(imagens),
  });

export const eliminarEvento = (id) => eliminar('eventos', id);

// Respostas sociais
export const getRespostasSociais = () => pedir('/api/admin/respostasSociais');

export const adicionarRespostaSocial = async (resposta, imagens = []) =>
  criar('respostasSociais', { ...resposta, urlsImagens: await enviarImagens(imagens) });

export const eliminarRespostaSocial = (id) => eliminar('respostasSociais', id);
