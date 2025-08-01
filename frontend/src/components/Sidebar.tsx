import LogoSVG from "@/components/LogoSVG";
import Bonfire from "@/components/major/Bonfire";
import Random from "@/components/major/Random";
import { ModeToggle } from "@/components/ModeToggle";
import PersonCard from "@/components/PersonCard";
import RandomSVG from "@/components/RandomSVG";
import { avatar, randomName } from "@/lib/utils";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSettings from "@/components/UserSettings";
import { loggedInUser } from "@/lib/auth";
import { useSearchParams } from "next/navigation";

interface SidebarProps {
  setSelectedContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export default function Sidebar({ setSelectedContent }: Readonly<SidebarProps>) {
  const searchParams = useSearchParams();
  const user = loggedInUser(searchParams)!;
  return (
    <div className="m-1 flex flex-col h-full space-y-2 w-fit rounded-sm bg-stone-200 p-1 dark:bg-stone-900">
      <div className="flex w-full flex-col justify-center space-y-1">
        <div
          className="group flex items-center space-x-3 rounded-sm bg-stone-100 px-3 transition-all hover:bg-primary hover:p-2 hover:pl-14 dark:bg-neutral-800 dark:hover:bg-primary"
          onClick={() => {
            setSelectedContent(<Bonfire />);
          }}
        >
          <LogoSVG className="m-4 mx-0 h-8 w-8 rounded-full bg-primary p-1 text-primary-foreground transition-all group-hover:bg-stone-900 group-hover:text-primary" />
          <span className="transition-all group-hover:text-stone-900">
            Go to Bonfire
          </span>
        </div>
        <div
          className="group flex items-center space-x-3 rounded-sm bg-stone-100 px-3 transition-all hover:bg-primary hover:p-2 hover:pl-14 dark:bg-neutral-800 dark:hover:bg-primary"
          onClick={() => {
            setSelectedContent(<Random />);
          }}
        >
          <RandomSVG className="m-4 mx-0 h-8 w-8 rounded-full bg-primary p-1 text-primary-foreground transition-all group-hover:bg-stone-900 group-hover:text-primary" />
          <span className="transition-all  dark:group-hover:text-stone-900">
            Random Chat
          </span>
        </div>
      </div>

      <Tabs
        defaultValue="friends"
        className="w-full flex-grow rounded-md bg-neutral-300 dark:bg-neutral-800"
      >
        <TabsList className="mb-1 flex w-full justify-evenly bg-neutral-300 dark:bg-neutral-800">
          <TabsTrigger
            className="m-1 w-full transition-all hover:bg-stone-400 data-[state=active]:bg-primary data-[state=active]:text-black dark:hover:bg-stone-700 dark:data-[state=active]:bg-primary dark:data-[state=active]:text-black"
            value="friends"
          >
            Friends
          </TabsTrigger>
          <TabsTrigger
            className="m-1 w-full transition-all hover:bg-stone-400 data-[state=active]:bg-primary data-[state=active]:text-black dark:hover:bg-stone-700 dark:data-[state=active]:bg-primary dark:data-[state=active]:text-black"
            value="recents"
          >
            Recents
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className="mt-0 flex max-h-[62vh] flex-col space-y-1 overflow-y-scroll"
          value="friends"
        >
          {[...Array(3).keys()].map((i) => {
            const name = randomName();
            return (
              <PersonCard
                key={i}
                name={name}
                avatar={avatar(name)}
                course="Computer Science"
                setSelectedContent={setSelectedContent}
                i={i}
              />
            );
          })}
        </TabsContent>
        <TabsContent
          className="mt-0 flex max-h-[62vh] flex-col space-y-1 overflow-y-scroll"
          value="recents"
        >
          {[...Array(16).keys()].map((i) => {
            const name = randomName();
            return (
              <PersonCard
                key={i}
                name={name}
                avatar={avatar(name)}
                course="Computer Science"
                setSelectedContent={setSelectedContent}
                i={i}
              />
            );
          })}
        </TabsContent>
      </Tabs>
      <div className="flex w-full items-center justify-between rounded-md bg-stone-200 pr-2 dark:bg-stone-900">
        <UserSettings user={user} />
        <div className="flex">
          <ModeToggle />
          <div className="group mx-0 flex h-10 w-10 items-center justify-center rounded-md p-1 text-primary-foreground dark:text-primary transition-all hover:bg-primary hover:text-primary-foreground dark:hover:text-primary-foreground">
            <Cog6ToothIcon className="h-6 w-6 transition-all motion-duration-2000 group-hover:motion-preset-spin" />
          </div>
        </div>
      </div>
    </div>
  );
}
