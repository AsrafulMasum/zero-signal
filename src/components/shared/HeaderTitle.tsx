

export default function HeaderTitle({ title , className }: { title: string , className?: string }) {
  return (
    <h2 className={"text-2xl font-medium "+ className}>{title}</h2>
  )
}
