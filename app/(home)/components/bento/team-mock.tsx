/* eslint-disable @next/next/no-img-element */
const people = [
  {
    name: "shadcn",
    role: "Owner",
    image: "https://github.com/shadcn.png",
    online: true,
  },
  {
    name: "Felipe Menezes",
    role: "Admin",
    image: "https://github.com/felipemenezes098.png",
    online: true,
  },
  {
    name: "Pedro Duarte",
    role: "Member",
    image: "https://github.com/peduarte.png",
    online: false,
  },
]

export function TeamMock() {
  return (
    <div className="flex w-full max-w-[16rem] flex-col gap-3 rounded-[var(--radius)] border border-border bg-card p-3.5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold text-foreground">
            Design team
          </p>
          <p className="text-[9px] text-muted-foreground">
            3 members · 2 online
          </p>
        </div>
        <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-medium text-primary-foreground">
          Pro
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {people.map((person) => (
          <div key={person.name} className="flex items-center gap-2">
            <span className="relative">
              <img
                src={person.image}
                alt={person.name}
                className="size-7 rounded-full object-cover ring-1 ring-border"
              />
              {person.online && (
                <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
              )}
            </span>
            <span className="flex-1 truncate text-[11px] text-foreground">
              {person.name}
            </span>
            <span className="rounded-full border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground">
              {person.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
