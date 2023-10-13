/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: 'build',
  assetPrefix: '.',
  typescript: {
    ignoreBuildErrors: true,
  },
}
