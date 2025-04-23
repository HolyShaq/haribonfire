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
import HaribonAvatar from "./HaribonAvatar";

interface UserSettingsProps {
  user: User;
}
export default function UserSettings({ user }: UserSettingsProps) {
  const UserSection = () => (
    <div className="flex w-full items-center space-x-2 px-2 rounded-md transition-all hover:bg-stone-300 dark:hover:bg-stone-800">
      <HaribonAvatar user={user} />
      <div className="flex flex-col items-start justify-center">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs leading-none text-muted-foreground">
          Computer Science
        </p>
      </div>
    </div>
  );

  const DialogSection = () => (
    <div className="flex">
      <div className="relative">
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
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
