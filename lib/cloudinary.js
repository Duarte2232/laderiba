/**
 * Faz upload de um arquivo para o Cloudinary via API
 * @param {File} arquivo - O arquivo a ser enviado
 * @returns {Promise<string>} - A URL do arquivo no Cloudinary
 */
export const uploadParaCloudinary = async (arquivo) => {
  if (!arquivo) return '';
  
  try {
    const formData = new FormData();
    formData.append('file', arquivo);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro no upload: ${error}`);
    }
    
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Erro ao fazer upload para o Cloudinary:', error);
    throw error;
  }
};

/**
 * Extrai o ID público do Cloudinary a partir de uma URL
 * @param {string} url - URL do Cloudinary
 * @returns {string|null} - ID público ou null se não for possível extrair
 */
export const extrairIdPublico = (url) => {
  if (!url) return null;
  
  try {
    // O formato da URL do Cloudinary normalmente é:
    // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<extension>
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // O ID público geralmente está nas últimas partes do caminho, após 'upload'
    const uploadIndex = pathParts.findIndex(part => part === 'upload');
    if (uploadIndex !== -1 && uploadIndex < pathParts.length - 1) {
      // Combina todas as partes após 'upload', excluindo a versão (v1234...)
      const relevantParts = pathParts.slice(uploadIndex + 1);
      // Se a primeira parte começar com 'v' seguido por números, é uma versão
      const startIndex = relevantParts[0].startsWith('v') && /^v\d+$/.test(relevantParts[0]) ? 1 : 0;
      
      // Combina o restante para formar o ID público
      const publicId = relevantParts.slice(startIndex).join('/');
      // Remove a extensão do arquivo, se houver
      return publicId.replace(/\.[^/.]+$/, '');
    }
    return null;
  } catch (error) {
    console.error('Erro ao extrair ID público do Cloudinary:', error);
    return null;
  }
};

/**
 * Exclui um arquivo do Cloudinary pelo seu ID público via API
 * @param {string} publicId - ID público do arquivo no Cloudinary
 * @returns {Promise<boolean>} - True se a exclusão for bem-sucedida, False caso contrário
 */
export const excluirDoCloudinary = async (publicId) => {
  if (!publicId) return false;
  
  try {
    const response = await fetch('/api/delete-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id: publicId }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ao excluir arquivo: ${error}`);
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Erro ao excluir arquivo do Cloudinary:', error);
    return false;
  }
}; 