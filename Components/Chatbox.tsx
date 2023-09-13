import {
  Avatar,
  AvatarGroup,
  Button,
  Center,
  Divider,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Socket {
  on(event: string, callback: (data: any) => void): void;
  off(event: string): void;
}

interface ChatboxProps {
  socket: Socket;
  classid: string;
  session: ActiveSessionResource | null | undefined;
}

interface ChatText {
  from: string;
  text: string;
  time: Date;
}

interface LiveList {
  ufname: string;
  uimage: string;
}

const Chatbox = ({ socket, classid, session }: ChatboxProps) => {
  const [myText, setMyText] = useState("");
  const [textRecords, setTextRecords] = useState<ChatText[]>([]);
  const [liveList, setLiveList] = useState<LiveList[]>([]);

  useEffect(() => {
    const handleRecMsg = (msg: { txt: string; from: string }) => {
      console.log(msg);
      setTextRecords((prev) => [
        ...prev,
        {
          from: msg.from,
          text: msg.txt,
          time: new Date(),
        },
      ]);
    };

    const handleliveList = (list: LiveList[]) => {
      // console.log(list);
      setLiveList(list);
    };

    socket.on("livelist", handleliveList);
    socket.on("recMsg", handleRecMsg);

    return () => {
      socket.off("recMsg");
      socket.off("livelist");
    };
  }, [socket]);

  function handleMessageSend() {
    socket.emit("sendMsg", {
      from: "me",
      txt: myText,
      classid,
    });
    setTextRecords((textRecords) => [
      ...textRecords,
      {
        from: "me",
        text: myText,
        time: new Date(),
      },
    ]);
    setMyText("");
  }

  const handleTimeConverter = (diff: number) => {
    const timeDiffMs = Math.abs(diff);
    if (0 < timeDiffMs && timeDiffMs < 1000) {
      return "Just Now";
    } else if (1000 < timeDiffMs && timeDiffMs < 60000) {
      return `${Math.round(timeDiffMs / 1000)} Secs ago`;
    } else if (6000 < timeDiffMs && timeDiffMs < 3600000) {
      return `${Math.round(timeDiffMs / 60000)} Mins ago`;
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gray-300 p-4 flex justify-center items-center">
        <AvatarGroup size="sm" max={7}>
          {liveList.map((user, index) => (
            <Avatar key={index} name={user.ufname} src={user.uimage} />
          ))}
        </AvatarGroup>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <span className="font-semibold ml-4">{liveList.length} Online</span>
      </div>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {!textRecords.length && (
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">Welcome {session.user.firstName}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                1 min ago
              </span>
            </div>
          </div>
        )}
        {textRecords.map((msg, index) => {
          return msg.from === "me" ? (
            <div
              key={index}
              className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
            >
              <div>
                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  {handleTimeConverter(new Date() - msg.time)}
                </span>
              </div>
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={session.user.imageUrl}
                  alt={session.user.firstName}
                />
              </div>
            </div>
          ) : (
            <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={msg.from.uimage}
                  alt={msg.from.ufname}
                />
              </div>
              <div>
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  {msg.from.ufname} {handleTimeConverter(new Date() - msg.time)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-300 p-4">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="Chat Message..."
            value={myText}
            onChange={(e) => setMyText(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleMessageSend}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  );
};

export default Chatbox;
