import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import EmojiPicker from "./EmojiPicker";

function Input() {
  const [input, SetInput] = useState("");
  const [file, setFile] = useState(
    "https://c.tenor.com/IVQgkTbHZhYAAAAd/spinning-monkey-spinning-ape.gif"
  );
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const addImage = () => {};

  const handleInput = (e) => {
    SetInput(e.target.value);
    console.log(e.target.value);
  };

  const deleteImage = () => {
    setFile(null);
  };

  return (
    //   space-x-3 means spacing between the children
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
    >
      <img
        src="https://yt3.ggpht.com/yti/APfAmoFHPde2CwUNNaO_M9u1NRXkAaRnGi9smtU63HABgw=s88-c-k-c0x00ffffff-no-rj-mo"
        alt="Profile Picture"
        className="w-11 h-11 rounded-full cursor-pointer"
      ></img>
      {/* divide-y makes a border btween each of the children, so that you dont have to manually add the borders to each element */}
      <div className="w-full divide-y divide-gray-700 ">
        <div>
          <textarea
            // onChange={handleInput}
            onChange={(e) => handleInput(e)}
            value={input}
            name="tweetbox"
            rows="2"
            placeholder="What's happening?"
            className="w-full  bg-transparent border-none outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide min-h-[4em]"
          ></textarea>

          {/* this is where images will be shown when uploaded to the tweet  */}
          <div className="relative">
            {/* here the absolute is absolute to the RELATIVE div, so if we move the relative div, the absolute will move as well */}
            {file && (
              <>
                <div
                  // instead of creating a brand new function you can do this? lol ok
                  onClick={() => setFile(null)}
                  //   onClick={deleteImage}
                  className="top-1 left-1 cursor-pointer absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center"
                >
                  <XIcon className="text-white h-5"></XIcon>
                </div>
                <img
                  // src=
                  src={file}
                  alt="user uploaded file"
                  className="rounded-2xl max-h-80 max-w-full object-contain mb-3"
                ></img>
              </>
            )}
          </div>
        </div>
        <div className="flex items-end">
          <div className="flex items-center pt-2.5">
            {/* onclick means that when u click, it goes to the filepicker ref and does the click action */}
            <div
              className="iconDiv"
              onClick={() => filePickerRef.current.click()}
            >
              <PhotographIcon className="icon" />
              <input
                type="file"
                hidden
                onClick={() => console.log("clicked")}
                onChange={addImage}
                ref={filePickerRef}
              ></input>
            </div>
            <div className="iconDiv">
              <ChartBarIcon className="icon rotate-90"></ChartBarIcon>
            </div>
            <div className="iconDiv" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="icon"></EmojiHappyIcon>
            </div>
            <div className="iconDiv">
              <CalendarIcon className="icon"></CalendarIcon>
            </div>
          </div>
          <button className=" xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full h-8 w-20  font-bold shadow-md hover:bg-[#1a8cd8]">
            Tweet
          </button>
        </div>
        {showEmojis && <EmojiPicker/>}
      </div>
    </div>
  );
}

export default Input;
