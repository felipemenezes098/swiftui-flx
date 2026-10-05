const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=75&w=600&auto=format&fit=crop`

export const madeForYou = [
  {
    title: "Daily Mix 1",
    subtitle: "Ambient · Lo-fi",
    image: unsplash("1636393951880-c34a76eb1be5"),
  },
  {
    title: "Deep Focus",
    subtitle: "Instrumental",
    image: unsplash("1595769557174-77c5002cff45"),
  },
  {
    title: "Low Tide",
    subtitle: "Acoustic chill",
    image: unsplash("1573808092199-d471c3b83d7e"),
  },
  {
    title: "Night Drive",
    subtitle: "Synthwave",
    image: unsplash("1675830028194-02f405ff664b"),
  },
]

export const recentlyPlayed = [
  {
    title: "Afterglow",
    subtitle: "The Softs",
    image: unsplash("1586830746542-19b25c53497f"),
  },
  {
    title: "Northbound",
    subtitle: "Kites",
    image: unsplash("1649653061232-9eab9b2faf70"),
  },
  {
    title: "Parallel Motion",
    subtitle: "Declarative State",
    image: unsplash("1693903395525-dcdf17566d0c"),
  },

  {
    title: "Harbor Lights",
    subtitle: "Mara Vale",
    image: unsplash("1723595919240-c7d6ca63849b"),
  },
  {
    title: "Blue Hours",
    subtitle: "Lumen",
    image: unsplash("1574263733128-6937c62dada8"),
  },
]
