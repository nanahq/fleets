/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
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
    experimental: {
        isrMemoryCacheSize: 0,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
            }
        }
        return config
    }
};

export default nextConfig;
