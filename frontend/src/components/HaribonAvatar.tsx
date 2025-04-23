import { avatar, cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/common/interfaces";

interface HaribonAvatarProps {
  user?: User;
  name?: string;
  avatar_seed?: string;
  avatar_style?: string;
}
export default function HaribonAvatar({
  user,
  name = "",
  avatar_seed = "",
  avatar_style = "",
}: HaribonAvatarProps) {
  // If user does not exist, use the optional parameters instead
  return (
    <Avatar className={cn("h-10 w-10", avatar_style)}>
      <AvatarImage src={avatar(user ? user.avatar_seed : avatar_seed)} />
      <AvatarFallback>
        {user ? user.name.slice(0, 2) : name.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
