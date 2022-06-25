import React, { useState } from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import Notification from "./Notification";
import Drake from "../assets/drake.webp";
import Jack from "../assets/jack_dorsey.webp";
import Cat from "../assets/cat.jpeg";
function NotificationFeed() {
  // followed,like,commentlike,retweet,reply

  const [notifications, setNotifications] = useState([
    { user: "Jack Dorsey", type: "followed", userImg: Jack.src },
    {
      type: "like",
      user: "Andrew Ma",
      userImg: "https://rb.gy/ogau5a",
      text: "This is a really cool website.",
      image: Cat.src,
    },
    {
      user: "Andrew Ma",
      type: "retweet",
      userImg: "https://rb.gy/ogau5a",
      text: "I love getting notifications!",
    },
    {
      type: "commentlike",
      user: "Drake",
      userImg: Drake.src,
      text: "I hope Drake wins another award soon!",
    },
  ]);

  console.log(Jack);
  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px] bg-black">
      {/* // whenever we use fixed or sticky, we have to define a height value. top value */}
      {/* <img src={Jack}></img> */}
      <div className=" bg-black text-[#d9d9d9]  flex items-center sm:justify-between py-2 px-3 sticky top-0 border-b border-gray-700 z-50">
        <h1 className="text-lg sm:text-xl font-bold">Notifications</h1>
        <div className="hoverAnimation cursor-pointer w-9 h-9 justify-center items-center flex xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white "></SparklesIcon>
        </div>
      </div>
      <>
        {notifications.length === 0 && <h1 className="text-white">Loading</h1>}
        {/* <button onClick={checkPosts}>clck here</button>{" "} */}
        <div className="pb-72">
          {notifications.length > 0 &&
            notifications.map((notification) => {
              return <Notification notification={notification}></Notification>;
            })}
        </div>
      </>
    </div>
  );
}

export default NotificationFeed;
