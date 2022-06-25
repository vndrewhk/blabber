import {
  HeartIcon,
  SwitchHorizontalIcon,
  UserIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import Post from "./Post";


function Notification({ notification }) {
  console.log(notification);
  if (notification.type == "followed") {
    return (
      <div className="notification">
        <div className="flex">
          <UserIcon className="h-11 w-11 text-[#1d9bf0]"></UserIcon>
        </div>
        <div className="flex-col ml-2">
          <img
            src={notification.userImg}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full ml-[5px] xl:ml-[2.5px] xl:mr-5"
          ></img>
          <b>{notification.user}</b> followed you!
        </div>
      </div>
    );
  }
  if (notification.type == "like") {
    return (
      <div className="notification">
        <div className="flex">
          <HeartIcon className="h-11 w-11 text-[#e73d5f]"></HeartIcon>
        </div>
        <div className="flex-col ml-2">
          <img
            src={notification.userImg}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full ml-[5px] xl:ml-[2.5px] xl:mr-5"
          ></img>
          <b>{notification.user}</b> liked your tweet!
          <div className="text-[#6e767d]">{notification.text}</div>
          {notification.image && (
            <img
              src={notification?.image}
              alt=""
              className="rounded-2xl max-h-[700px] object-cover mr-2"
            ></img>
          )}
        </div>
      </div>
    );
  }
  if (notification.type == "commentlike") {
    return (
      <div className="notification">
        <div className="flex">
          <HeartIcon className="h-11 w-11 text-[#e73d5f]"></HeartIcon>
        </div>
        <div className="flex-col ml-2">
          <img
            src={notification.userImg}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full ml-[5px] xl:ml-[2.5px] xl:mr-5"
          ></img>
          <b>{notification.user}</b> liked your reply!
          <div className="text-[#6e767d]">{notification.text}</div>
          {notification.image && (
            <img
              src={notification.image}
              alt="Profile Picture"
              className="w-10 h-10 rounded-full ml-[5px] xl:ml-[2.5px] xl:mr-5"
            ></img>
          )}
        </div>
      </div>
    );
  }
  if (notification.type == "retweet") {
    return (
      <div className="notification">
        <div className="flex">
          <SwitchHorizontalIcon className="h-11 text-green-500" />
        </div>
        <div className="flex-col ml-2">
          <img
            src={notification.userImg}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full ml-[5px] xl:ml-[2.5px] xl:mr-5"
          ></img>
          <b>{notification.user}</b> retweeted your tweet!
          <div className="text-[#6e767d]">{notification.text}</div>
          {notification.image && (
            <img
              src={notification?.image}
              alt=""
              className="rounded-2xl max-h-[700px] object-cover mr-2"
            ></img>
          )}
        </div>
      </div>
    );
  }
  //   if (notification.type == "reply") {
  //     return <Post></Post>;
  //   }
  return <div className="notification">Notification</div>;
}

export default Notification;
