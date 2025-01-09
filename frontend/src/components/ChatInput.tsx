import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Input } from "./ui/input";

interface ChatInputProps {
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}
export default function ChatInput({ setChatInput, onSend }: ChatInputProps) {
  return (
    <div className="group flex w-full flex-row items-center space-x-2">
      <Input
        className="h-12 bg-neutral-200 dark:bg-neutral-800 ring-offset-primary transition-all focus-visible:w-10/12"
        placeholder="Send a message"
        onChange={(e) => setChatInput(e.target.value)}
        onSubmit={onSend}
      />
      <div
        className="group/button flex flex-grow items-center justify-start rounded-2xl bg-primary p-1 transition-all group-focus-within:h-12 group-focus-within:rounded-sm group-focus-within:pl-6"
        onClick={onSend}
      >
        <PaperAirplaneIcon className="h-7 w-7 text-primary-foreground group-hover/button:motion-preset-wobble" />
        <span className="absolute translate-x-[-90px] text-nowrap text-primary-foreground opacity-0 transition-all group-focus-within:translate-x-0 group-focus-within:pl-9 group-focus-within:opacity-100">
          Send message
        </span>
      </div>
    </div>
  );
}
