// Importa os módulos necessários do Firebase
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { uploadParaCloudinary, extrairIdPublico, excluirDoCloudinary } from './cloudinary';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==============================================
// FUNÇÕES PARA DOCUMENTOS
// ==============================================

// Função para obter todos os documentos
export const getDocumentos = async (categoria = null) => {
  try {
    let q;
    
    if (categoria) {
      // Traduzir de português para inglês
      const categoryEnglish = traduzirCategoriaReverso(categoria);
      
      q = query(
        collection(db, 'documentos'), 
        where('category', '==', categoryEnglish), // Mudando de 'categoria' para 'category'
        orderBy('dataCriacao', 'desc')
      );
    } else {
      q = query(
        collection(db, 'documentos'),
        orderBy('dataCriacao', 'desc')
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        titulo: data.title || "",
        descricao: data.description || "",
        categoria: traduzirCategoria(data.category) || "",
        urlArquivo: data.urlArquivo || "",
        data: formatarData(data.dataCriacao.toDate())
      };
    });
  } catch (error) {
    console.error('Erro ao obter documentos:', error);
    return [];
  }
};

// Função para obter documentos recentes
export const getDocumentosRecentes = async (limite = 6) => {
  try {
    const q = query(
      collection(db, 'documentos'),
      orderBy('dataCriacao', 'desc'),
      limit(limite)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        titulo: data.title || "",
        descricao: data.description || "",
        categoria: traduzirCategoria(data.category) || "",
        urlArquivo: data.urlArquivo || "",
        data: formatarData(data.dataCriacao.toDate())
      };
    });
  } catch (error) {
    console.error('Erro ao obter documentos recentes:', error);
    return [];
  }
};

// Função para obter um documento específico pelo ID
export const getDocumentoPorId = async (id) => {
  try {
    const docRef = doc(db, 'documentos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        data: formatarData(data.dataCriacao.toDate())
      };
    } else {
      console.log('Documento não encontrado');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter documento:', error);
    return null;
  }
};

// Função para adicionar um novo documento
export const adicionarDocumento = async (documento, arquivo) => {
  try {
    // Primeiro, faz upload do arquivo para o Cloudinary se existir
    let urlArquivo = '';
    if (arquivo) {
      urlArquivo = await uploadParaCloudinary(arquivo);
    }
    
    // Adiciona o documento ao Firestore
    const docRef = await addDoc(collection(db, 'documentos'), {
      ...documento,
      urlArquivo,
      dataCriacao: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar documento:', error);
    throw error;
  }
};

// Função para atualizar um documento existente
export const atualizarDocumento = async (id, documento, arquivo) => {
  try {
    const docRef = doc(db, 'documentos', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Documento não encontrado');
    }
    
    const documentoAtual = docSnap.data();
    let urlArquivo = documentoAtual.urlArquivo || '';
    
    // Se tiver um novo arquivo, faz upload para o Cloudinary e exclui o anterior
    if (arquivo) {
      // Exclui o arquivo anterior do Cloudinary, se existir
      if (urlArquivo) {
        const publicId = extrairIdPublico(urlArquivo);
        if (publicId) {
          await excluirDoCloudinary(publicId);
        }
      }
      
      // Faz upload do novo arquivo
      urlArquivo = await uploadParaCloudinary(arquivo);
      documento.urlArquivo = urlArquivo;
    }
    
    await updateDoc(docRef, documento);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    throw error;
  }
};

// Função para excluir um documento
export const excluirDocumento = async (id) => {
  try {
    // Obtém o documento para verificar se há um arquivo associado
    const docRef = doc(db, 'documentos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const documento = docSnap.data();
      
      // Se houver um arquivo, exclui do Cloudinary
      if (documento.urlArquivo) {
        const publicId = extrairIdPublico(documento.urlArquivo);
        if (publicId) {
          await excluirDoCloudinary(publicId);
        }
      }
      
      // Exclui o documento do Firestore
      await deleteDoc(docRef);
      return true;
    } else {
      console.warn('Tentativa de excluir documento inexistente');
      return false;
    }
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    throw error;
  }
};

// ==============================================
// FUNÇÕES PARA EVENTOS
// ==============================================

// Função para obter todos os eventos
export const getEventos = async () => {
  try {
    const q = query(
      collection(db, 'eventos'),
      orderBy('dataCriacao', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        titulo: data.title || "",
        descricao: data.description || "",
        local: data.location || "",
        dataEvento: data.eventDate ? formatarData(data.eventDate.toDate()) : "",
        urlsImagens: data.urlsImagens || [],
        data: formatarData(data.dataCriacao.toDate())
      };
    });
  } catch (error) {
    console.error('Erro ao obter eventos:', error);
    return [];
  }
};

// Função para obter eventos recentes
export const getEventosRecentes = async (limite = 6) => {
  try {
    const q = query(
      collection(db, 'eventos'),
      orderBy('dataCriacao', 'desc'),
      limit(limite)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        titulo: data.title || "",
        descricao: data.description || "",
        local: data.location || "",
        dataEvento: data.eventDate ? formatarData(data.eventDate.toDate()) : "",
        urlsImagens: data.urlsImagens || [],
        data: formatarData(data.dataCriacao.toDate())
      };
    });
  } catch (error) {
    console.error('Erro ao obter eventos recentes:', error);
    return [];
  }
};

// Função para obter um evento específico pelo ID
export const getEventoPorId = async (id) => {
  try {
    const docRef = doc(db, 'eventos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        dataEvento: data.eventDate ? formatarData(data.eventDate.toDate()) : "",
        data: formatarData(data.dataCriacao.toDate())
      };
    } else {
      console.log('Evento não encontrado');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter evento:', error);
    return null;
  }
};

// Função para adicionar um novo evento
export const adicionarEvento = async (evento, imagens = []) => {
  try {
    // Faz upload das imagens para o Cloudinary se existirem
    const urlsImagens = [];
    
    if (imagens && imagens.length > 0) {
      // Se imagens for um único arquivo, converta para array
      const imagensArray = Array.isArray(imagens) ? imagens : [imagens];
      
      // Faz upload de cada imagem
      for (const imagem of imagensArray) {
        if (imagem) {
          const urlImagem = await uploadParaCloudinary(imagem);
          urlsImagens.push(urlImagem);
        }
      }
    }
    
    // Adiciona o evento ao Firestore
    const docRef = await addDoc(collection(db, 'eventos'), {
      ...evento,
      urlsImagens,
      dataCriacao: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar evento:', error);
    throw error;
  }
};

// Função para atualizar um evento existente
export const atualizarEvento = async (id, evento, imagens = [], imagensParaRemover = []) => {
  try {
    const docRef = doc(db, 'eventos', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Evento não encontrado');
    }
    
    const eventoAtual = docSnap.data();
    let urlsImagens = eventoAtual.urlsImagens || [];
    
    // Remove imagens especificadas
    if (imagensParaRemover && imagensParaRemover.length > 0) {
      for (const urlRemover of imagensParaRemover) {
        const publicId = extrairIdPublico(urlRemover);
        if (publicId) {
          await excluirDoCloudinary(publicId);
        }
        // Remove a URL da lista
        urlsImagens = urlsImagens.filter(url => url !== urlRemover);
      }
    }
    
    // Adiciona novas imagens
    if (imagens && imagens.length > 0) {
      // Se imagens for um único arquivo, converta para array
      const imagensArray = Array.isArray(imagens) ? imagens : [imagens];
      
      // Faz upload de cada nova imagem
      for (const imagem of imagensArray) {
        if (imagem) {
          const urlImagem = await uploadParaCloudinary(imagem);
          urlsImagens.push(urlImagem);
        }
      }
    }
    
    // Atualiza o evento com as novas URLs de imagens
    evento.urlsImagens = urlsImagens;
    
    await updateDoc(docRef, evento);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    throw error;
  }
};

// Função para excluir um evento
export const excluirEvento = async (id) => {
  try {
    // Obtém o evento para verificar se há imagens associadas
    const docRef = doc(db, 'eventos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const evento = docSnap.data();
      
      // Se houver imagens, exclui do Cloudinary
      if (evento.urlsImagens && evento.urlsImagens.length > 0) {
        for (const urlImagem of evento.urlsImagens) {
          const publicId = extrairIdPublico(urlImagem);
          if (publicId) {
            await excluirDoCloudinary(publicId);
          }
        }
      }
      
      // Exclui o evento do Firestore
      await deleteDoc(docRef);
      return true;
    } else {
      console.warn('Tentativa de excluir evento inexistente');
      return false;
    }
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    throw error;
  }
};

// ==============================================
// FUNÇÕES PARA RESPOSTAS SOCIAIS
// ==============================================

// Função para obter todas as respostas sociais
export const getRespostasSociais = async (tipo = null) => {
  try {
    let q;
    
    // Remover a filtragem por tipo e usar apenas a ordenação por data de criação
    q = query(
      collection(db, 'respostasSociais'),
      orderBy('dataCriacao', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        titulo: data.title || "",
        descricao: data.description || "",
        urlsImagens: data.urlsImagens || [],
        data: formatarData(data.dataCriacao.toDate())
      };
    });
  } catch (error) {
    console.error('Erro ao obter respostas sociais:', error);
    return [];
  }
};

// Função para obter respostas sociais recentes
export const getRespostasSociaisRecentes = async (limite = 6) => {
  try {
    const q = query(
      collection(db, 'respostasSociais'),
      orderBy('dataCriacao', 'desc'),
      limit(limite)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        titulo: data.title || "",
        descricao: data.description || "",
        urlsImagens: data.urlsImagens || [],
        data: formatarData(data.dataCriacao.toDate())
      };
    });
  } catch (error) {
    console.error('Erro ao obter respostas sociais recentes:', error);
    return [];
  }
};

// Função para obter uma resposta social específica pelo ID
export const getRespostaSocialPorId = async (id) => {
  try {
    const docRef = doc(db, 'respostasSociais', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        data: formatarData(data.dataCriacao.toDate())
      };
    } else {
      console.log('Resposta social não encontrada');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter resposta social:', error);
    return null;
  }
};

// Função para adicionar uma nova resposta social
export const adicionarRespostaSocial = async (respostaSocial, imagens = []) => {
  try {
    // Faz upload das imagens para o Cloudinary se existirem
    const urlsImagens = [];
    
    if (imagens && imagens.length > 0) {
      // Se imagens for um único arquivo, converta para array
      const imagensArray = Array.isArray(imagens) ? imagens : [imagens];
      
      // Faz upload de cada imagem
      for (const imagem of imagensArray) {
        if (imagem) {
          const urlImagem = await uploadParaCloudinary(imagem);
          urlsImagens.push(urlImagem);
        }
      }
    }
    
    // Adiciona a resposta social ao Firestore
    const docRef = await addDoc(collection(db, 'respostasSociais'), {
      ...respostaSocial,
      urlsImagens,
      dataCriacao: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar resposta social:', error);
    throw error;
  }
};

// Função para atualizar uma resposta social existente
export const atualizarRespostaSocial = async (id, respostaSocial, imagens = [], imagensParaRemover = []) => {
  try {
    const docRef = doc(db, 'respostasSociais', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Resposta social não encontrada');
    }
    
    const respostaSocialAtual = docSnap.data();
    let urlsImagens = respostaSocialAtual.urlsImagens || [];
    
    // Remove imagens especificadas
    if (imagensParaRemover && imagensParaRemover.length > 0) {
      for (const urlRemover of imagensParaRemover) {
        const publicId = extrairIdPublico(urlRemover);
        if (publicId) {
          await excluirDoCloudinary(publicId);
        }
        // Remove a URL da lista
        urlsImagens = urlsImagens.filter(url => url !== urlRemover);
      }
    }
    
    // Adiciona novas imagens
    if (imagens && imagens.length > 0) {
      // Se imagens for um único arquivo, converta para array
      const imagensArray = Array.isArray(imagens) ? imagens : [imagens];
      
      // Faz upload de cada nova imagem
      for (const imagem of imagensArray) {
        if (imagem) {
          const urlImagem = await uploadParaCloudinary(imagem);
          urlsImagens.push(urlImagem);
        }
      }
    }
    
    // Atualiza a resposta social com as novas URLs de imagens
    respostaSocial.urlsImagens = urlsImagens;
    
    await updateDoc(docRef, respostaSocial);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar resposta social:', error);
    throw error;
  }
};

// Função para excluir uma resposta social
export const excluirRespostaSocial = async (id) => {
  try {
    // Obtém a resposta social para verificar se há imagens associadas
    const docRef = doc(db, 'respostasSociais', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const respostaSocial = docSnap.data();
      
      // Se houver imagens, exclui do Cloudinary
      if (respostaSocial.urlsImagens && respostaSocial.urlsImagens.length > 0) {
        for (const urlImagem of respostaSocial.urlsImagens) {
          const publicId = extrairIdPublico(urlImagem);
          if (publicId) {
            await excluirDoCloudinary(publicId);
          }
        }
      }
      
      // Exclui a resposta social do Firestore
      await deleteDoc(docRef);
      return true;
    } else {
      console.warn('Tentativa de excluir resposta social inexistente');
      return false;
    }
  } catch (error) {
    console.error('Erro ao excluir resposta social:', error);
    throw error;
  }
};

// ==============================================
// FUNÇÕES AUXILIARES
// ==============================================

// Função auxiliar para formatar a data
const formatarData = (data) => {
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(data);
};

// Função auxiliar para traduzir as categorias de documentos
function traduzirCategoria(categoria) {
  const traducoes = {
    'financial': 'Financeiros',
    'minutes': 'Atas',
    'reports': 'Relatórios',
    'other': 'Outros'
  };
  
  return traducoes[categoria] || categoria;
}

// Função para traduzir nomes de categorias de português para inglês (documentos)
function traduzirCategoriaReverso(categoria) {
  const traducoes = {
    'Financeiros': 'financial',
    'Atas': 'minutes',
    'Relatórios': 'reports',
    'Outros': 'other'
  };
  
  return traducoes[categoria] || categoria;
}

// Função auxiliar para traduzir as categorias de eventos
function traduzirCategoriaEvento(categoria) {
  const traducoes = {
    'workshop': 'Workshop',
    'conference': 'Conferência',
    'community': 'Comunidade',
    'other': 'Outros'
  };
  
  return traducoes[categoria] || categoria;
}

// Função para traduzir nomes de categorias de português para inglês (eventos)
function traduzirCategoriaEventoReverso(categoria) {
  const traducoes = {
    'Workshop': 'workshop',
    'Conferência': 'conference',
    'Comunidade': 'community',
    'Outros': 'other'
  };
  
  return traducoes[categoria] || categoria;
}

// Função auxiliar para traduzir os tipos de respostas sociais
function traduzirTipoRespostaSocial(tipo) {
  const traducoes = {
    'childhood': 'Infância',
    'elderly': 'Terceira Idade',
    'family': 'Família',
    'other': 'Outros'
  };
  
  return traducoes[tipo] || tipo;
}

// Função para traduzir nomes de tipos de português para inglês (respostas sociais)
function traduzirTipoRespostaSocialReverso(tipo) {
  const traducoes = {
    'Infância': 'childhood',
    'Terceira Idade': 'elderly',
    'Família': 'family',
    'Outros': 'other'
  };
  
  return traducoes[tipo] || tipo;
}

// ==============================================
// ALIASES EM INGLÊS
// ==============================================

// Aliases para documentos
export const getAllDocuments = getDocumentos;
export const uploadDocument = adicionarDocumento;
export const deleteDocument = excluirDocumento;

// Aliases para eventos
export const getEvents = getEventos;
export const getRecentEvents = getEventosRecentes;
export const getEventById = getEventoPorId;
export const addEvent = adicionarEvento;
export const updateEvent = atualizarEvento;
export const deleteEvent = excluirEvento;

// Aliases para respostas sociais
export const getSocialResponses = getRespostasSociais;
export const getRecentSocialResponses = getRespostasSociaisRecentes;
export const getSocialResponseById = getRespostaSocialPorId;
export const addSocialResponse = adicionarRespostaSocial;
export const updateSocialResponse = atualizarRespostaSocial;
export const deleteSocialResponse = excluirRespostaSocial;

export { db }; 