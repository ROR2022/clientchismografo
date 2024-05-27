const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  
})

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chismogafo.s3.us-east-2.amazonaws.com',
        pathname: '**',
      },
    ],
},
});