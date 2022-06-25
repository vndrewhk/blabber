import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/solid";
import React from "react";

function Profile(props) {
  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px] bg-black">
      {/* // whenever we use fixed or sticky, we have to define a height value. top value */}
      {/* header */}
      <div className=" bg-black text-[#d9d9d9]  flex items-center sm:justify-between py-2 px-3 sticky top-0 border-b border-gray-700 z-50">
        <div className="flex items-center">
          <ArrowLeftIcon
            className="text-white h-5 cursor-pointer mr-3"
            onClick={() => router.push("/")}
          ></ArrowLeftIcon>
          <h1 className="text-lg sm:text-xl font-bold">Profile</h1>
        </div>
        <div className="hoverAnimation cursor-pointer w-9 h-9 justify-center items-center flex xl:px-0 ml-auto">
          <UserCircleIcon className="h-10 text-white "></UserCircleIcon>
        </div>
      </div>
      {/* profile */}
      <div className="w-full flex flex-col text-white">
        <img
          src="https://pbs.twimg.com/media/FUrqV3eWIAED2AB?format=jpg&name=large"
          alt=""
          className="max-h-[200px] min-h-[200px] w-full mr-2 object-cover"
        ></img>
        <div className="ml-[25px]">
          <img
            src="https://media1.popsugar-assets.com/files/thumbor/zan-t_Me63if8oqWYE9ENiPLlhA/0x224:2826x3050/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/02/11/894/n/1922398/87f6bb525e430e7bd44e40.22278576_/i/Drake.jpg"
            alt="Profile Picture"
            className="border-black border-4 w-[130px] h-[130px] rounded-full ml-[25px] xl:ml-[2.5px] xl:mr-5 z-50 top-[180px] absolute"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Profile;
