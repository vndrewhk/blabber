import { SparklesIcon } from "@heroicons/react/outline";
import React from "react";
import Input from "./Input";
import Posts from "./Posts";

function Feed(props) {
  console.log(props);
  return (
    //   we can give sidebar/feed/widgets all a chosen flex -> flex-[0.3], flex-[0.4], flex[0.3]
    // or give feed a flex-grow, and then the rest of the components a fixed width so it fills out all of the space
    // breakpoint for small occurs >small <xl because we dont have a medium

    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px] bg-black">
      {/* // whenever we use fixed or sticky, we have to define a height value. top value */}
      <div className=" bg-black text-[#d9d9d9]  flex items-center sm:justify-between py-2 px-3 sticky top-0 border-b border-gray-700 z-50">
        <h1 className="text-lg sm:text-xl font-bold">{props.page}</h1>
        <div className="hoverAnimation cursor-pointer w-9 h-9 justify-center items-center flex xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white "></SparklesIcon>
        </div>
      </div>

      {props.input && <Input></Input>}
      <Posts></Posts>
    </div>
  );
}

export default Feed;
