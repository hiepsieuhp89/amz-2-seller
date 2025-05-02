import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to add CORS headers
function corsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust this to specific domains in production
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  return response;
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return corsHeaders(NextResponse.json({}, { status: 200 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  // Check if at least one parameter is provided
  if (!username && !email && !phone) {
    return corsHeaders(NextResponse.json(
      { 
        status: false, 
        message: 'Vui lòng cung cấp ít nhất một tham số (username, email, hoặc phone)',
        data: { exists: false },
        errors: null,
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    ));
  }

  try {
    // Forward the request to the actual backend API
    const apiBaseUrl = 'https://amz.dunghaysai.site';
    
    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (username) queryParams.append('username', username);
    if (email) queryParams.append('email', email);
    if (phone) queryParams.append('phone', phone);
    
    const response = await axios.get(`${apiBaseUrl}/auth/check-user-exists?${queryParams.toString()}`);
    
    // Return the response from the backend
    return corsHeaders(NextResponse.json(response.data, { status: response.status }));
    
  } catch (error: any) {
    console.error('Error checking if user exists:', error);
    
    // If we got a response from the backend with an error
    if (error.response) {
      return corsHeaders(NextResponse.json(
        error.response.data,
        { status: error.response.status }
      ));
    }
    
    // Generic error if no response
    return corsHeaders(NextResponse.json(
      { 
        status: false, 
        message: 'Có lỗi xảy ra khi kiểm tra thông tin người dùng',
        data: { exists: false },
        errors: error.message || 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    ));
  }
} 