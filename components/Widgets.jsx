import { SearchCircleIcon, SearchIcon } from "@heroicons/react/outline";
import React from "react";
import Trending from "./Trending";
import UserMedia from "./UserMedia";

function Widgets({ trendingResults, followResults, userMedia }) {
  const DUMMY_TRENDING = [
    {
      heading: "T20 World Cup 2021",
      description: "This is a description",
      img: "https://rb.gy/ogau5a",
      tags: ["#T20 World Cup Final", "Kane Williamson"],
    },
  ];

  return (
    <div className="hidden lg:inline ml-8 xl:w-[400px] py-1 space-y-5">
      <div className="sticky items-center top-0 rounded-full py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 w-5 z-50"></SearchIcon>
          <input
            type="text"
            placeholder="Search Blabber"
            className=" bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border-transparent w-full"
          ></input>
        </div>
      </div>
      {userMedia && <UserMedia></UserMedia>}
      <div className="mt-3 text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">What&#39;s Happening?</h4>
        {DUMMY_TRENDING.map((result, index) => (
          <Trending key={index} result={result} index={index}></Trending>
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0]">
          Show more
        </button>
      </div>
    </div>
  );
}

export default Widgets;
