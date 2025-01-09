import DateDivider from "./DateDivider";
import Message from "./Message";

interface MessageLogProps {
  messages: {
    user_id: number;
    text: string;
    timestamp: string;
    show_sender?: boolean;
  }[];
}

export default function MessageLog({ messages }: MessageLogProps) {
  return (
    <div className="flex flex-grow flex-col-reverse items-start justify-start px-4">
      {messages
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
        .map((message, index) => {
          let differentDay = false;
          if (index < messages.length - 2) {
            // Omit sender if previous message is from the same user
            const prevMessage = messages[index + 1]; // + 1 because the list is reversed
            if (prevMessage.user_id == message.user_id) {
              message = { ...message, show_sender: false };
            }
            // Handle differentDay flag
            differentDay =
              prevMessage.timestamp.split("T")[0] !=
              message.timestamp.split("T")[0];
          }

          return (
            <>
              <Message key={index} {...message} />
              {differentDay && <DateDivider date={message.timestamp} />}
            </>
          );
        })}
    </div>
  );
}