import { avatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/common/interfaces";

interface HaribonAvatarProps {
  user: User;
}
export default function HaribonAvatar({ user }: HaribonAvatarProps) {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={avatar(user.avatar_seed)} />
      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
