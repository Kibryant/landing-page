/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/v0/b/landing-page-aad23.appspot.com/o/**',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         config.module.ignored = [...(config.module.ignored || []), /__test__/]
    //     }
    //     return config
    // },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/:path*',
    //             destination: 'http://localhost:4000/:path*',
    //         },
    //     ]
    // },
}

module.exports = nextConfig
