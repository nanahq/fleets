import { NextMiddleware, NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/create-account'],
};

const parseCookie = (req: NextRequest, cookieName: string): string | null => {
    const cookie = req.cookies.get(cookieName);
    return cookie?.value || null;
};

const authMiddleware = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const headers = new Headers(req.headers);
        const sessionToken = parseCookie(req, 'Authentication');
        const path = req.nextUrl.pathname;
        const isAuthPage = path === '/login' || path === '/create-account';

        if (sessionToken) {
            if (isAuthPage) {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }

            headers.set('Authorization', `Bearer ${sessionToken}`);
            return NextResponse.next({ request: { headers } });
        } else {
            if (!isAuthPage) {
                return NextResponse.redirect(new URL('/login', req.url));
            }

            // Allow access to login/create-account pages for non-logged in users
            return NextResponse.next();
        }
    } catch (error) {
        console.error('Error in cookie-based authentication:', error);
        return NextResponse.error();
    }
};

export default function middleware(req: NextRequest) {
    return authMiddleware(req);
}
