import { avatar, cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { time } from "console";

interface MessageProps {
  user_id: number;
  text: string;
  timestamp: string;
  show_sender?: boolean;
}

// TODO: Replace with dynamic data
export default function Message({
  user_id,
  text,
  timestamp,
  show_sender = true,
}: MessageProps) {
  const datetimeFormat = new Intl.DateTimeFormat("default", {
    "hour": "numeric",
    "minute": "numeric",
  })
  const datetime = new Date(timestamp);
  const timestampString = datetimeFormat.format(datetime)
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start space-x-3 mb-6",
        !show_sender && "mb-[14px] mt-[-26px]",
      )}
    >
      {show_sender ? (
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar(user_id)} />
          <AvatarFallback>Ac</AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-10 w-10" />
      )}

      <div className="flex flex-col items-start justify-end space-y-2">
        {show_sender && (
          <div className="flex flex-row items-end justify-end space-x-2">
            <span className="font-semibold leading-none">
              Ace Byrone Halili
            </span>
            <span className="text-xs leading-none text-muted-foreground">
              {timestampString}
            </span>
          </div>
        )}
        <span className={cn("text-sm leading-none font-light")}>{text}</span>
      </div>
    </div>
  );
}
