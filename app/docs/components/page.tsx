import { redirect } from "next/navigation"

import { componentsHref, defaultPlatform } from "@/lib/docs"

export default function ComponentsPage() {
  redirect(componentsHref(defaultPlatform))
}
