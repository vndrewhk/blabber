import { useRouter } from "next/router";
import React from "react";
function SidebarLink(props) {
  const router = useRouter();
  return (
    //   by doing justify start, it puts everything at the front
    //when it's not xl, you want to hide the text
    <div
      onClick={() => {
        router.push(props.routeTo);
      }}
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        props.active && "font-bold"
      }`}
    >
      <props.Icon className="h-7"></props.Icon>
      {/* <Icon className="h-7" /> */}
      <span className="hidden xl:inline">{props.text}</span>
    </div>
  );
}

export default SidebarLink;
