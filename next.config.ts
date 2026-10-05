import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async rewrites() {
    return [{ source: "/docs/:path*.md", destination: "/md/:path*" }]
  },
  async headers() {
    const immutable = "public, max-age=31536000, immutable"
    const hourly = "public, max-age=3600, stale-while-revalidate=86400"

    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: immutable }],
      },
      {
        source: "/r/:path*",
        headers: [{ key: "Cache-Control", value: hourly }],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Cache-Control", value: hourly }],
      },
      {
        source: "/docs/:path*.md",
        headers: [{ key: "Cache-Control", value: hourly }],
      },
      {
        source: "/md/:path*",
        headers: [{ key: "Cache-Control", value: hourly }],
      },
    ]
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
})

export default withMDX(nextConfig)
