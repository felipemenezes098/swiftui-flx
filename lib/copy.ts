async function writeLater(text: Promise<string>) {
  if (typeof ClipboardItem === "undefined") {
    await navigator.clipboard.writeText(await text)
    return
  }
  const blob = text.then((value) => new Blob([value], { type: "text/plain" }))
  await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })])
}

export const copyToClipboard = async (text: string | Promise<string>) => {
  try {
    if (typeof text === "string") {
      await navigator.clipboard.writeText(text)
    } else {
      await writeLater(text)
    }
    return true
  } catch (err) {
    console.error("Failed to copy text: ", err)
    return false
  }
}
