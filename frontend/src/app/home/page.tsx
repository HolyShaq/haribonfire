import LogoSVG from "@/components/LogoSVG";
import PersonCard from "@/components/PersonCard";
import RandomSVG from "@/components/RandomSVG";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { AvatarGenerator } from "random-avatar-generator";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";

export default function Home() {
  const avatarGenerator = new AvatarGenerator();

  return (
    <div className="flex h-screen w-screen bg-background">
      <div className="m-1 flex w-1/5 flex-col space-y-2 rounded-sm bg-stone-900 p-1">
        <div className="flex w-full flex-col justify-center space-y-1">
          <div className="group flex items-center space-x-3 rounded-sm bg-stone-800 px-3 transition-all hover:bg-primary hover:p-2 hover:px-16">
            <LogoSVG className="m-4 mx-0 h-8 w-8 rounded-full bg-primary p-1 text-primary-foreground transition-all group-hover:bg-stone-900 group-hover:text-primary" />
            <span className="transition-all group-hover:text-stone-900">
              Go to Bonfire
            </span>
          </div>
          <div className="group flex items-center space-x-3 rounded-sm bg-stone-800 px-3 transition-all hover:bg-primary hover:p-2 hover:px-16">
            <RandomSVG className="m-4 mx-0 h-8 w-8 rounded-full bg-primary p-1 text-primary-foreground transition-all group-hover:bg-stone-900 group-hover:text-primary" />
            <span className="transition-all group-hover:text-stone-900">
              Random Chat
            </span>
          </div>
        </div>

        <Tabs
          defaultValue="friends"
          className="w-full flex-grow rounded-md bg-neutral-800"
        >
          <TabsList className="mb-2 flex w-full justify-around">
            <TabsTrigger
              className="m-1 w-full transition-all hover:bg-stone-700 data-[state=active]:bg-primary data-[state=active]:text-black"
              value="friends"
            >
              Friends
            </TabsTrigger>
            <TabsTrigger
              className="m-1 w-full transition-all hover:bg-stone-700 data-[state=active]:bg-primary data-[state=active]:text-black"
              value="recents"
            >
              Recents
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="mt-0 flex max-h-[62vh] flex-col space-y-1 overflow-y-scroll"
            value="friends"
          >
            {[...Array(3).keys()].map((i) => (
              <PersonCard
                key={i}
                name={`Person ${i}`}
                avatar={avatarGenerator.generateRandomAvatar()}
                course="Computer Science"
                i={i}
              />
            ))}
          </TabsContent>
          <TabsContent
            className="mt-0 flex max-h-[62vh] flex-col space-y-1 overflow-y-scroll"
            value="recents"
          >
            {[...Array(16).keys()].map((i) => (
              <PersonCard
                key={i}
                name={`Person ${i}`}
                avatar={avatarGenerator.generateRandomAvatar()}
                course="Computer Science"
                i={i}
              />
            ))}
          </TabsContent>
        </Tabs>
        <div className="flex w-full items-center justify-between rounded-md bg-stone-900 px-2">
          <div className="flex items-center space-x-2 rounded-md pr-2 transition-all hover:bg-stone-800">
            <Avatar className="m-1 ml-0 h-12 w-12">
              <AvatarImage src={avatarGenerator.generateRandomAvatar()} />
              <AvatarFallback>Ac</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm font-medium leading-none">Ace Byrone</p>
              <p className="text-xs leading-none text-muted-foreground">
                Computer Science
              </p>
            </div>
          </div>
          <div className="group mx-0 flex h-10 w-10 items-center justify-center rounded-md p-1 text-primary transition-all hover:bg-primary hover:text-primary-foreground">
            <Cog6ToothIcon className="h-6 w-6 transition-all group-hover:rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}
