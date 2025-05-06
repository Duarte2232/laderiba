import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configuração do Cloudinary (lado do servidor)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // Converte o arquivo para buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Usa o API do cloudinary para fazer upload do buffer
    // Cria uma string base64 do buffer para enviar ao Cloudinary
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    // Upload para o Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64String,
        {
          folder: 'documentos',
          resource_type: 'auto',
          upload_preset: 'laderiba'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    
    // Retorna a URL segura do arquivo
    return NextResponse.json({ 
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id 
    });
    
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar o upload" },
      { status: 500 }
    );
  }
} 