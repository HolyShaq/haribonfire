import { User } from "@/common/interfaces";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HaribonAvatar from "./HaribonAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { generateAvatarSeed } from "@/lib/utils";
import { updateUserInfo } from "@/lib/api";

interface UserSettingsProps {
  user: User;
}
export default function UserSettings({ user }: UserSettingsProps) {
  const [name, setName] = useState(user.name);
  const [course, setCourse] = useState(user.course);
  const [avatarSeed, setAvatarSeed] = useState(user.avatar_seed);
  const { toast } = useToast();

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
    <div className="flex flex-col px-3 space-y-6 w-full items-center">
      <div className="flex space-x-6 w-full">
        <div className="flex flex-col w-full space-y-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold pl-3">Display Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold pl-3">Course</p>
            <Input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="relative mt-3">
          <HaribonAvatar
            name={"..."}
            avatar_seed={avatarSeed}
            avatar_style="h-32 w-32 outline outline-stone-700"
          />
          <ArrowPathIcon
            className="h-10 w-10 absolute bottom-1 right-1 text-primary"
            onClick={() => {
              const seed = generateAvatarSeed();
              console.log(seed);
              setAvatarSeed(seed);
            }}
          />
        </div>
      </div>
      <DialogClose asChild>
        <Button
          onClick={() => {
            updateUserInfo(user.id, name, avatarSeed, course);
            toast({
              title: "Profile updated successfully!",
              description: "",
            });
          }}
        >
          Save Changes
        </Button>
      </DialogClose>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger>
        <UserSection />
      </DialogTrigger>
      <DialogContent
        className="w-[500px]"
      >
        <DialogTitle />
        <DialogSection />
      </DialogContent>
    </Dialog>
  );
}
