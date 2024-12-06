/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_ENDPOINT}/driver-gateway/v1/:path*`,
            },
            {
                source: '/socket.io',
                destination: `${process.env.API_ENDPOINT}/socket.io/`,
            }
        ];
    },
};

export default nextConfig;
