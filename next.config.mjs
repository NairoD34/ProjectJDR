/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'project-jdr-bucket.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

};

export default nextConfig;
