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
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    }

    // Add aliases to redirect legacy imports to modern Reown AppKit
    config.resolve.alias = {
      ...config.resolve.alias,
      '@web3modal/ethereum': '@reown/appkit',
      '@web3modal/react': '@reown/appkit/react',
      'wagmi/connectors/walletConnect': '@reown/appkit-adapter-wagmi',
    }

    // Externalize problematic modules on server side
    if (isServer) {
      config.externals = [...(config.externals || []), 'WalletConnectConnector']
    }

    return config
  },
}

export default nextConfig
