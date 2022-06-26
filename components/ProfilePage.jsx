import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import React from "react";
import Posts from "./Posts";
import SamplePost from "./SamplePost";
import cat from "../assets/cat.jpeg";

function Profile(props) {
  const { data: session } = useSession();
  const samplePosts = [
    {
      email: session?.user.email,
      id: "104849212177198701141",
      text: "This is a sample profile post! Unfortunately, interactivity is limited here. Please go to the home page for full usage!",
      timestamp: "4 days ago",
      // timestamp: at {seconds: 1655754835, nanoseconds: 580000000}
      userImg: session?.user.image,
      username: session?.user.name,
    },
    {
      email: session?.user.email,
      id: "104849212177198701141",
      image: cat.src,
      text: "",
      timestamp: "4 days ago",
      // timestamp: at {seconds: 1655754835, nanoseconds: 580000000}
      userImg: session?.user.image,
      username: session?.user.name,
    },
    {
      email: session?.user.email,
      id: "104849212177198701141",
      text: "This page is under development.",
      timestamp: "6 days ago",
      // timestamp: at {seconds: 1655754835, nanoseconds: 580000000}
      userImg: session?.user.image,
      username: session?.user.name,
    },
  ];
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
        <div className="ml-[25px] pb-[70px] ">
          <img
            src="https://media1.popsugar-assets.com/files/thumbor/zan-t_Me63if8oqWYE9ENiPLlhA/0x224:2826x3050/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/02/11/894/n/1922398/87f6bb525e430e7bd44e40.22278576_/i/Drake.jpg"
            alt="Profile Picture"
            className="border-black border-4 w-[130px] h-[130px] rounded-full ml-[25px] xl:ml-[2.5px] xl:mr-5 z-40 top-[180px] absolute"
          ></img>
        </div>
        <div className="relative pl-5 pb-5 border-b-[1px] border-gray-700">
          <p className="text-xl font-bold">{session?.user.name}</p>
          <p className="text-[#6e767d]">{session?.user.email}</p>
          <p className="mt-2">Biography</p>
          <div className="mt-2 flex w-full">
            <p className="text-white mr-5">
              711 <span className="text-[#6e767d]">following</span>
            </p>
            <p className="text-white">
              42 <span className="text-[#6e767d]">followers</span>
            </p>
          </div>
        </div>
        {/* do a bunch of sample posts */}
        {/* <Posts></Posts> */}
        <div className="pb-72">
          {samplePosts.length > 0 &&
            samplePosts.map((post) => {
              // console.log(post["_document"].data.value.mapValue.fields);
              return (
                <SamplePost
                  postInfo={post}
                  key={Math.random()}
                  id={post.id}
                ></SamplePost>
              );
            })}{" "}
        </div>
      </div>
    </div>
  );
}

export default Profile;
