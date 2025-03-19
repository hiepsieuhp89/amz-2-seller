import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isSessionActive = (request: NextRequest): string => {

    const sessionCookie = request.cookies.get('accessToken')?.value!;
    return sessionCookie;
};

const middleware = (request: NextRequest) => {
    const url = request.nextUrl.clone(); 
    const path = url.pathname;
    // if (!isSessionActive(request) && path !== '/sign-in' &&
    // !path.includes('sign-up')) {
    //     url.pathname = '/sign-in';  
    //     return NextResponse.redirect(url);
    // }
    // if (isSessionActive(request) && (path === '/sign-in'||path.includes('sign-up'))) {
    //     url.pathname = '/home/seller';
    //     return NextResponse.redirect(url);
    // }
    return NextResponse.next();
};

export const config = {
    matcher: ['/', '/app/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],  
};

export default middleware;
