import { Fragment } from "react";
import ChatDivider from "./ChatDivider";
import DateDivider from "./DateDivider";
import Message from "./Message";
import { MessageProps } from "./Message";

interface MessageLogProps {
  messages: MessageProps[];
}

export default function MessageLog({ messages }: MessageLogProps) {
  return (
    <div className="flex max-h-[92vh] pt-8 overflow-y-scroll flex-col-reverse items-start justify-start px-4">
      {messages
        .sort((a, b) => b.sent_at.localeCompare(a.sent_at))
        .map((message, index) => {
          let differentDay = false;
          let start = false;
          if (index < messages.length - 1) {
            // Omit sender if previous message is from the same user
            const prevMessage = messages[index + 1]; // + 1 because the list is reversed
            if (prevMessage.user_id == message.user_id) {
              message = { ...message, show_sender: false };
            }
            // Handle differentDay flag
            differentDay =
              prevMessage.sent_at.split("T")[0] !=
              message.sent_at.split("T")[0];
          } else {
            start = true;
          }

          return (
            <Fragment key={index}>
              <Message {...message} />
              {differentDay && <DateDivider date={message.sent_at} />}
              {start && <ChatDivider />}
            </Fragment>
          );
        })}
    </div>
  );
}
