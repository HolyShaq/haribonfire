interface DateDividerProps {
  date: string;
}

export default function DateDivider({ date }: DateDividerProps) {
  const dateFormat = new Intl.DateTimeFormat("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const dateObj = new Date(date)
  const dateString = dateFormat.format(dateObj)
  return (
    <div className="flex flex-row w-full items-center mb-5 space-x-2 justify-evenly">
      <div className="flex-grow h-[1px] bg-muted" />
      <span className="text-xs text-muted-foreground">{dateString}</span>
      <div className="flex-grow h-[1px] bg-muted" />
    </div>
  )
}
