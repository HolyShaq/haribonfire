import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Input } from "./ui/input";

interface ChatInputProps {
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}
export default function ChatInput({ chatInput, setChatInput, onSend }: ChatInputProps) {
  return (
    <div className="group flex w-full flex-row items-center space-x-2">
      <Input
        className="h-12 bg-neutral-200 dark:bg-neutral-800 ring-offset-primary transition-all flex-grow"
        placeholder="Send a message"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <div
        className="group/button flex group-focus-within:min-w-[80px] min-w-9 w-9 group-focus-within:w-[80px] items-center justify-center rounded-2xl bg-primary p-1 transition-all group-focus-within:h-12 group-focus-within:rounded-sm"
        onClick={onSend}
      >
        <PaperAirplaneIcon className="h-7 w-7 text-primary-foreground group-hover/button:motion-preset-wobble" />

      </div>
    </div>
  );
}
