import { NextMiddleware, NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/dashboard/:path*'],
};

const parseCookie = (req: NextRequest, cookieName: string): string | null => {
    const cookie = req.cookies.get(cookieName);
    return cookie?.value || null;
};

const authMiddleware: NextMiddleware = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const headers = new Headers(req.headers);
        const sessionToken = parseCookie(req, 'Authentication');

        if (sessionToken) {
            headers.set('Authorization', `Bearer ${sessionToken}`);
            return NextResponse.next({ request: { headers } });
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch (error) {
        console.error('Error in cookie-based authentication:', error);
        return NextResponse.error();
    }
};

export default async function middleware(req: NextRequest) {
    return authMiddleware(req);
}
