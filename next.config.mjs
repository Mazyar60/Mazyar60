/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    
    // Add fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    }

    // Ignore modules that try to import W3mFrameProviderSingleton
    config.plugins.push(
      new config.webpack.IgnorePlugin({
        checkResource(resource) {
          return resource.includes('W3mFrameProviderSingleton')
        },
      })
    )

    // Add alias to redirect any legacy Web3Modal imports to Reown AppKit
    config.resolve.alias = {
      ...config.resolve.alias,
      '@web3modal/core': '@reown/appkit',
      '@web3modal/wagmi': '@reown/appkit-adapter-wagmi',
      '@web3modal/react': '@reown/appkit/react',
    }

    // Externalize problematic modules in server builds
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'W3mFrameProviderSingleton': 'W3mFrameProviderSingleton'
      })
    }

    return config
  },
}

export default nextConfig
