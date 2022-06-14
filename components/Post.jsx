import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
// import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";

function Post({ postInfo }) {
  const { data: session } = useSession();
  const postPage = false;
  console.log(postInfo);
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      {/* if not postpage */}
      {!postPage && (
        <img
          className="w-11 h-11 rounded-full cursor-pointer mr-4"
          src={postInfo?.userImg}
          alt="Profile Picture"
        ></img>
      )}

      {/* if postpage */}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              className="w-11 h-11 rounded-full cursor-pointer mr-4"
              src={postInfo?.userImg}
              alt="Profile Picture"
            ></img>
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {postInfo.username}
              </h4>
              <span
                className={`text-small sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                {postInfo.email}
              </span>{" "}
              ·{" "}
              <span className="hover:underline text-small sm:text-[15px]"></span>
              {!postPage && (
                <p className="sm:text-base text-[15px] text-[#d9d9d9] mt-0.5">
                  {postInfo.text}
                </p>
              )}
            </div>
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]"></DotsHorizontalIcon>
          </div>
        </div>
        {postPage && (
          <p className="sm:text-base text-[15px] text-[#d9d9d9] mt-0.5">
            {postInfo.text}
          </p>
        )}
        <img
          src={postInfo?.image}
          alt=""
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        ></img>
        <div
          className={`text-[#6e767d] flex flex-row justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {/* {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )} */}
          </div>

          {session.user.uid === postInfo?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            {/* <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )} */}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
