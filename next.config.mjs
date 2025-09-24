/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true, // Enables gzip compression
    poweredByHeader: false, // Minor security and performance
    images: {
        formats: ['image/webp'],
    },
};

export default nextConfig;
