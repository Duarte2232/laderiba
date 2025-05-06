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
    const { public_id } = await request.json();
    
    if (!public_id) {
      return NextResponse.json(
        { error: "ID público não fornecido" },
        { status: 400 }
      );
    }

    // Exclui o arquivo do Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
    
    if (result.result === 'ok') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Falha ao excluir arquivo", result },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error('Erro ao excluir arquivo:', error);
    return NextResponse.json(
      { error: error.message || "Erro ao excluir arquivo" },
      { status: 500 }
    );
  }
} 