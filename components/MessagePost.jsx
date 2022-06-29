import React from "react";

function MessagePost({ message }) {
  // if no sender, assume it is our post
  if (message.sender) {
    return (
      <div className="ml-2 max-w-[75%] flex justify-start items-center my-2 ">
        {/* <div>Image</div> */}
        {message.senderImg && (
          <img
            className="w-9 h-9 rounded-full cursor-pointer mr-4"
            src={message.senderImg}
            alt="Profile Picture"
          ></img>
        )}
        {!message.senderImg && (
          <img
            className="w-9 h-9 rounded-full cursor-pointer mr-4"
            src="https://rb.gy/ogau5a"
            alt="Profile Picture"
          ></img>
        )}
        <div className="bg-gray-700 max-w-[70%] text-white rounded-t-xl rounded-r-xl p-2 py-2.5">
          {message.text}
        </div>
      </div>
    );
  }
  return (
    <div className=" flex justify-end mr-2 my-2 flex-wrap">
      <div className="bg-[#1d9bf0] max-w-[75%] text-white rounded-t-xl rounded-l-xl p-2 py-2.5 break-words">
        {message.text}
      </div>
    </div>
  );
}

export default MessagePost;
