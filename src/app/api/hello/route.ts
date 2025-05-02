import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  
  return NextResponse.json({
    message: 'Hello from API route!',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: 'POST request received successfully',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in hello API:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
} 