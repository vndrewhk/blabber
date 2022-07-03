import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon, SearchIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MessagePost from "./MessagePost";
import MessageUser from "./MessageUser";
import drake from "../assets/drake.webp";
import jackDorsey from "../assets/jack_dorsey.webp";

function MessageTab() {
  const [focused, setFocused] = useState(1);
  const router = useRouter();
  const { data: session } = useSession();
  const [messageList, setMessageList] = useState([
    {
      id: 1,
      recipient: "vndrewhk",
      userImg: "",
      messages: [
        { sender: "vndrewhk", text: "Hello!" },
        { text: "This is a fake messaging system!" },
      ],
    },
    {
      id: 2,
      recipient: "drake",
      userImg: drake.src,
      messages: [
        {
          sender: "drake",
          senderImg: drake.src,
          text: "This is definitely Drake messaging you right now.",
        },
        {
          text: "Wow! I can't believe it!",
        },
      ],
    },
    {
      id: 3,
      recipient: "Jack Dorsey",
      userImg: jackDorsey.src,
      messages: [
        {
          sender: "Jack Dorsey",
          senderImg: jackDorsey.src,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non ultrices arcu.",
        },
        {
          sender: "Jack Dorsey",
          senderImg: jackDorsey.src,
          text: " Fusce vel quam eget justo rhoncus tincidunt quis sed nibh. Morbi quis aliquam ipsum. Proin cursus quam lacus, et molestie tortor porttitor vel arcu.",
        },
        {
          sender: "Jack Dorsey",
          senderImg: jackDorsey.src,
          text: "Vestibulum neque ante, lacinia a sodales mattis, porttitor ac augue.",
        },
      ],
    },
  ]);
  // const selectedUser = users.find(user=>user.id===selectedUserId)
  const selectedUser = messageList.find((user) => user.id === focused);
  console.log(selectedUser);
  const selectUser = (id) => {
    setFocused(id);
    console.log("set to " + id);
  };
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
    // console.log(e.target.value);
  };

  const sendMessage = (id, message) => {
    console.log(message);
    let newMessages = messageList;
    newMessages.find((user) => user.id === id).messages.push({ text: message });

    setMessageList(newMessages);
    // setMessageList(
    //   ...messageList,
    //   selectedUser.messages.push({ text: message })
    // );
    setInput("");
  };

  return (
    <div className="text-white flex-row flex-grow border-l  border-gray-700 sm:ml-[73px] xl:ml-[370px] bg-black max-h-[100vh] ">
      <div className="flex w-full h-full max-h-full">
        <div
          className={`${focused && "hidden"}  ${
            !focused && "flex"
          } md:flex  text-[#d9d9d9] border-r border-gray-700 md:col md:flex-col md:w-[20vw] max-h-full`}
        >
          <div className="flex px-1.5 py-2 text-[#d9d9d9] font-semibold text-xl gap-4 sticky top-0 z-50 ml-2">
            <h1 className="text-lg sm:text-xl font-bold cursor-pointer">
              Messages
            </h1>
          </div>
          <div className="sticky items-center top-0 rounded-full py-1.5 pb-3 bg-black z-50 w-11/12 xl:w-9/12 ml-auto mr-auto">
            <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
              <SearchIcon className="text-gray-500 h-5 w-5 z-50"></SearchIcon>
              <input
                type="text"
                placeholder="Search Direct Messages"
                className=" text-sm bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border-transparent w-full"
              ></input>
            </div>
          </div>
          <div className="max-h-full">
            {messageList.map((user) => (
              <MessageUser
                onClick={selectUser.bind(null, user.id)}
                key={user.id}
                user={user}
                focused={focused == user.id}
              ></MessageUser>
            ))}
          </div>
        </div>
        {/* if a message not selected */}
        {!focused && (
          <div className="flex-nowrap  text-[#d9d9d9] border-r  border-gray-700 flex flex-col    w-[100vw] md:w-[40vw] ">
            <div className="flex px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-4 sticky top-0 z-50">
              <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
                <ArrowLeftIcon
                  className="text-white h-5 cursor-pointer"
                  onClick={() => router.push("/")}
                ></ArrowLeftIcon>
              </div>
              {/* <span className="text-white"> text {id}</span> */}
            </div>
            <div className="w-full h-full flex justify-center items-center flex-col">
              <h1 className="text-2xl">Select a message</h1>
              <p className="w-[35%] text-sm text-gray-500">
                Choose from your existing conversations, start a new one, or
                just keep swimming.
              </p>
            </div>
          </div>
        )}
        {/* message selectedI */}
        {focused && (
          <div className=" flex-nowrap  text-[#d9d9d9] border-r  border-gray-700 flex flex-col w-[100vw] md:w-[40vw] max-h-full">
            <div className=" flex px-1.5 py-2 border-b bg-black border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-4 sticky top-0 z-50">
              <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
                <ArrowLeftIcon
                  className="text-white h-5 cursor-pointer"
                  onClick={() => router.push("/")}
                ></ArrowLeftIcon>
              </div>
              {selectedUser.recipient}
              {/* <span className="text-white"> text {id}</span> */}
            </div>
            <div className="flex h-full flex-col w-full justify-end pb-5 max-h-[84vh]">
              {selectedUser.messages.map((message) => (
                <MessagePost
                  key={message.text}
                  className="w-full my-2"
                  message={message}
                ></MessagePost>
              ))}
            </div>
            <div className="sticky items-center top-0 py-1.5 bg-black z-50 border-gray-700 border-t">
              <div className="flex items-center border border-gray-700 p-3 rounded-full relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(focused, input);
                  }}
                  className=" bg-transparent outline-none text-[#d9d9d9] inset-0 pr-5 border-transparent w-full"
                >
                  <input
                    type="text"
                    onChange={(e) => handleInput(e)}
                    value={input}
                    placeholder="Start a new message"
                    className=" bg-transparent outline-none text-[#d9d9d9] inset-0 pr-5 border-transparent w-full"
                  ></input>
                </form>
                <PaperAirplaneIcon
                  onClick={() => sendMessage(focused, input)}
                  className="cursor-pointer icon rotate-90 text-[#1d9bf0] h-5 w-5"
                ></PaperAirplaneIcon>
              </div>
            </div>
          </div>
        )}
        <div className={`hidden md:hidden xl:flex`}>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default MessageTab;
