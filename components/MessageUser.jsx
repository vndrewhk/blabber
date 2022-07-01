import React from "react";

function MessageUser({ user, focused, onClick }) {
  // {
  //     id: 1,
  //     recipient: "vndrewhk",
  //     userImg: "",
  //     messages: [
  //       { sender: "vndrewhk", text: "Hello!" },
  //       { text: "This is a fake messaging system!" },
  //     ],
  //   },
  return (
    //   white-space: nowrap; overflow: scroll;
    <div
      onClick={onClick}
      className={`flex max-w-full items-center py-2 transition duration-200 ease-out  hover:bg-gray-700 cursor-pointer ${
        focused && "bg-gray-900"
      }`}
    >
      {user.userImg && (
        <img
          className="w-7 h-7 rounded-full cursor-pointer mr-3 ml-2"
          src={user.userImg}
          alt="Profile Picture"
        ></img>
      )}
      {!user.userImg && (
        <img
          className="w-7 h-7 rounded-full cursor-pointer mr-3 ml-2"
          src="https://rb.gy/ogau5a"
          alt="Profile Picture"
        ></img>
      )}
      <div className="flex flex-col max-w-[70%] overflow-hidden whitespace-nowrap text-sm text-[#d9d9d9]">
        <div>{user.recipient}</div>
        <div className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
          {user.messages[user.messages.length - 1].text}
        </div>
      </div>
    </div>
  );
}

export default MessageUser;
