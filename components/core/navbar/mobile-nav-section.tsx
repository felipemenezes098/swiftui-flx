import { motion } from "motion/react"

import { MobileLink } from "./mobile-link"

export interface MobileNavItem {
  title: string
  href: string
  external?: boolean
}

export function MobileNavSection({
  title,
  items,
  onClose,
}: Readonly<{
  title: string
  items: MobileNavItem[]
  onClose: () => void
}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      variants={{
        hidden: {
          opacity: 0,
          y: -8,
          transition: { duration: 0.2 },
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
          },
        },
      }}
      className="flex flex-col gap-4"
    >
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <nav className="flex flex-col items-start gap-3">
        {items.map((item) => (
          <MobileLink
            key={item.href}
            href={item.href}
            external={item.external}
            onClose={onClose}
          >
            <span className="text-xl font-medium">{item.title}</span>
          </MobileLink>
        ))}
      </nav>
    </motion.div>
  )
}
