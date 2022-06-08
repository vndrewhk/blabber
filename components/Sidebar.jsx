import React from "react";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  return (
    // we want to keep sidebar fixed because we dont want it to scroll when we scroll the feed through

    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image
          src="https://rb.gy/ogau5a"
          alt="twitter-logo"
          width={30}
          height={30}
        ></Image>
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active routeTo="/" />
        <SidebarLink text="Explore" Icon={HashtagIcon} routeTo="/explore" />
        <SidebarLink
          text="Notifications"
          Icon={BellIcon}
          routeTo="/notifications"
        />
        <SidebarLink text="Messages" Icon={InboxIcon} routeTo="/messages" />
        <SidebarLink
          text="Bookmarks"
          Icon={BookmarkIcon}
          routeTo="/bookmarks"
        />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} routeTo="/lists" />
        <SidebarLink text="Profile" Icon={UserIcon} routeTo="/profile" />
        <SidebarLink
          text="More"
          Icon={DotsCircleHorizontalIcon}
          routeTo="/more"
        />
      </div>
      {/* w-56 h-[52px] */}
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px]  text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      {/* flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24 */}
      <div className="text-[#d9d9d9] flex items-center ml:auto mt-auto hoverAnimation xl:ml-auto justify-between xl:w-56 xl:h-[52px]  ">
        <div className="flex">
          <img
            src="https://yt3.ggpht.com/yti/APfAmoFHPde2CwUNNaO_M9u1NRXkAaRnGi9smtU63HABgw=s88-c-k-c0x00ffffff-no-rj-mo"
            alt="Profile Picture"
            className="w-10 h-10 rounded-full ml-[5px] xl:ml-[2.5px] xl:mr-5"
          ></img>
          <div className="hidden xl:inline leading-5">
            <h4 className="text-white font-bold">Text</h4>
            <p className="text-gray-500">@Text2</p>
          </div>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline self-center ml-10 text-white"></DotsHorizontalIcon>
      </div>
    </div>
  );
}

export default Sidebar;