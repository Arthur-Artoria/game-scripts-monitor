/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'game-scripts-controller.oss-cn-qingdao.aliyuncs.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
