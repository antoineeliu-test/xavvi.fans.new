import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Test the configuration by trying to get account details
    const result = await cloudinary.api.ping();
    
    return NextResponse.json({
      success: true,
      config: {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
        api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
      },
      ping: result
    });
  } catch (error) {
    console.error('Cloudinary test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
        api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
      }
    }, { status: 500 });
  }
} 