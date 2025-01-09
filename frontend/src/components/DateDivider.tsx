interface DateDividerProps {
  date: string;
}

export default function DateDivider({ date }: DateDividerProps) {
  const dateString = new Date(date).toLocaleDateString();
  return (
    <div className="flex flex-row w-full items-center mb-5 space-x-2 justify-evenly">
      <div className="w-full h-[1px] bg-muted" />
      <span className="text-xs text-muted-foreground">{dateString}</span>
      <div className="w-full h-[1px] bg-muted" />
    </div>
  )
}
