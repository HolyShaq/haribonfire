import { User } from "@/common/interfaces";
import { avatar } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserSettingsProps {
  user: User;
}
export default function UserSettings({ user }: UserSettingsProps) {
  const UserSection = () => (
    <div className="flex w-full items-center space-x-2 px-2 rounded-md transition-all hover:bg-stone-300 dark:hover:bg-stone-800">
      <Avatar className="m-1 ml-0 h-12 w-12">
        <AvatarImage src={avatar(user.avatar_seed)} />
        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs leading-none text-muted-foreground">
          Computer Science
        </p>
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger>
        <UserSection />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
