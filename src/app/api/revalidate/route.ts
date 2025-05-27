import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Revalidate the home page and any influencer pages
    revalidatePath('/');
    revalidatePath('/influencer/[slug]', 'page');
    
    return NextResponse.json({ 
      revalidated: true, 
      message: 'Cache revalidated successfully' 
    });
  } catch (error) {
    console.error('Error revalidating cache:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate cache' },
      { status: 500 }
    );
  }
} 