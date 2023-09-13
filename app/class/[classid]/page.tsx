"use client";

import Chatbox from "@/Components/Chatbox";
import ChoirView from "@/Components/ChoirView";
import CodeBox from "@/Components/CodeBox";
import Directory from "@/Components/Directory";
import ScreenShareBox from "@/Components/ScreenShareBox";
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import { useAuth, useSession } from "@clerk/nextjs";
import ActionMenu from "@/Components/ActionMenu";

const fileFolders = [];

export default function classroom() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { classid } = useParams();
  const { userId, getToken } = useAuth();
  const { session } = useSession();
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        setSocket(
          io("https://a5e9-103-21-126-81.ngrok-free.app", {
            auth: {
              userId,
              token, //: `Bearer ${token}`,
            },
          })
        );
        return () => socket?.disconnect;
      } catch (e) {
        console.log("error fetching token", e);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    socket?.on("me", (id: string) => {
      setSocket(socket);
      // console.log(id, classid);
      socket?.emit("joinclass", classid);
      toast({
        title: "Joined Classroom",
        description: `Authenticated for class ${classid}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [socket]);
  return (
    <main className="bg-slate-800 flex h-screen justify-between p-2">
      {/* the left side */}
      {socket && (
        <div className="hidden w-64 pl-8 pt-8 lg:block">
          {/* ls files and folder */}
          <h2 className="font-bold p-4 text-white">Project Files & Folders</h2>
          <section className="text-white h-[60vh] overflow-auto">
            <Directory />
          </section>
          {/* ls tutor video */}
          <section className="hidden xl:block absolute bottom-5 hover:shadow-2xl hover:rounded-full">
            <ChoirView />
          </section>
        </div>
      )}
      {/* center live feed of screen or code */}
      {socket ? (
        <div className="pt-6 w-[75rem]">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em" className="text-white">
              <Tab>Code {"</>"}</Tab>
              <Tab>Screen {"[_]"}</Tab>
            </TabList>
            <TabPanels className="bg-slate-950 rounded-2xl h-[50rem]">
              <TabPanel>
                <CodeBox />
              </TabPanel>
              <TabPanel>
                <ScreenShareBox />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <CircularProgress isIndeterminate />
        </div>
      )}
      {/* right side with userprofile & live chat */}
      <div className="flex flex-col col-span-1 text-gray-800 pt-2 pr-4 pb-4">
        {socket && <ActionMenu />}
        {socket && (
          <Chatbox socket={socket} classid={classid} session={session} />
        )}
      </div>
    </main>
  );
}
