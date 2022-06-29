import React from "react";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import {
  HomeIcon as HomeIconSolid,
  BellIcon as BellIconSolid,
  InboxIcon as InboxIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserIcon as UserIconSolid,
  LogoutIcon,
} from "@heroicons/react/solid";

import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { modalTrue, inputTrue, toggleModal } from "../store/modalSlice";

function Sidebar(props) {
  const { data: session } = useSession();
  const router = useRouter();
  const modalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const modalChange = () => {
    dispatch(modalTrue());
    dispatch(inputTrue());
  };

  return (
    // we want to keep sidebar fixed because we dont want it to scroll when we scroll the feed through

    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image
          src="https://rb.gy/ogau5a"
          alt="twitter-logo"
          width={30}
          height={30}
          onClick={() => {
            router.push("/");
          }}
        ></Image>
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink
          text="Home"
          Icon={
            props.pathname != "/notifications" &&
            props.pathname != "/messages" &&
            props.pathname != "/bookmarks" &&
            props.pathname != "/profile"
              ? HomeIconSolid
              : HomeIcon
          }
          routeTo="/"
          active={
            props.pathname != "/notifications" &&
            props.pathname != "/messages" &&
            props.pathname != "/bookmarks" &&
            props.pathname != "/profile"
          }
        />
        {/* <SidebarLink text="Explore" Icon={HashtagIcon} routeTo="/explore" /> */}
        <SidebarLink
          text="Notifications"
          Icon={props.pathname == "/notifications" ? BellIconSolid : BellIcon}
          routeTo="/notifications"
          active={props.pathname == "/notifications"}
        />
        <SidebarLink
          text="Messages"
          Icon={props.pathname == "/messages" ? InboxIconSolid : InboxIcon}
          routeTo="/messages"
          active={props.pathname == "/messages"}
        />
        <SidebarLink
          text="Bookmarks"
          Icon={
            props.pathname == "/bookmarks" ? BookmarkIconSolid : BookmarkIcon
          }
          routeTo="/bookmarks"
          active={props.pathname == "/bookmarks"}
        />
        {/* <SidebarLink text="Lists" Icon={ClipboardListIcon} routeTo="/lists" /> */}
        <SidebarLink
          text="Profile"
          Icon={props.pathname == "/profile" ? UserIconSolid : UserIcon}
          routeTo="/profile"
          active={props.pathname == "/profile"}
        />
        {/* <SidebarLink
          text="More"
          Icon={DotsCircleHorizontalIcon}
          routeTo="/more"
        /> */}
      </div>
      {/* w-56 h-[52px] */}
      {!props.notHome && (
        <button
          onClick={modalChange}
          className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px]  text-lg font-bold shadow-md hover:bg-[#1a8cd8]"
        >
          Tweet
        </button>
      )}
      {props.notHome && (
        <button
          onClick={() => {
            router.push("/");
          }}
          className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px]  text-lg font-bold shadow-md hover:bg-[#1a8cd8]"
        >
          Tweet
        </button>
      )}
      {/* flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24 */}

      <div
        title="Logout"
        onClick={() => signOut()}
        className="text-[#d9d9d9] flex items-center ml:auto mt-auto hoverAnimation xl:ml-auto justify-between xl:w-56 xl:h-[52px]  "
      >
        <div className="flex">
          <img
            src={session?.user.image}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full ml-[5px] xl:ml-[2.5px] xl:mr-5"
          ></img>
          <div className="hidden xl:inline leading-5">
            <h4 className="text-white font-bold">{session?.user.name}</h4>
            <p className="text-gray-500">
              {session?.user.email.substring(
                0,
                session?.user.email.indexOf("@")
              )}
            </p>
          </div>
        </div>
        <b className="text-sm">
          <LogoutIcon className="text-white h-5"></LogoutIcon>
        </b>
        {/* <DotsHorizontalIcon className="h-5 hidden xl:inline self-center ml-10 text-white"></DotsHorizontalIcon> */}
      </div>
    </div>
  );
}

export default Sidebar;
