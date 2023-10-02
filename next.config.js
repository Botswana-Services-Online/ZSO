/** @type {import('next').NextConfig} */


const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
    
  });

  module.exports = withPWA({
    // reactStrictMode: false,
    // swcMinify: true,
  });
// const withPWA = require("next-pwa");
// module.exports = withPWA({
// 	pwa: {
// 		dest: "public",
// 		register: true,
//         disable: process.env.NODE_ENV ===      'development',
// 		skipWaiting: true,
//         reactStrictMode:false,
        
// 	},
// });


// const nextConfig = {
//     reactStrictMode:false,
//     swcMinify: true,
// }
// module.exports = nextConfig



