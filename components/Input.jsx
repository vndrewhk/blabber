import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
// import { addDoc, collection } from "firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import React, { useState, useRef } from "react";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
// import EmojiPicker from "./EmojiPicker";
function Input() {
  const { data: session } = useSession();
  const [input, SetInput] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  // "https://c.tenor.com/IVQgkTbHZhYAAAAd/spinning-monkey-spinning-ape.gif"
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const handleInput = (e) => {
    SetInput(e.target.value);
    console.log(e.target.value);
  };

  const addImage = (e) => {
    //   read doc on filereader
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result);
    };
    e.target.value = "";
  };

  const deleteImage = () => {
    setFile(null);
  };
  const sendPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    // adds a document to our collection (db)
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid || null,
      username: session.user.name || null,
      userImg: session.user.image || null,
      email: session.user.email || null,
      text: input,
      timestamp: serverTimestamp(),
    });

    // returns a storage reference for a given url

    // https://firebase.google.com/docs/storage/web/upload-files
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (file) {
      // uploads the file to the storage using a string
      await uploadString(imageRef, file, "data_url").then(async () => {
        //   create a url of the image  u just uploaded using this fn
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          // update firebase with the image u just created
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    SetInput("");
    setFile(null);
  };

  //   const addEmoji = (e) => {
  //     let sym = e.unified.split("-");
  //     let codesArray = [];
  //     sym.forEach((el) => codesArray.push("0x" + el));
  //     let emoji = String.fromCodePoint(...codesArray);
  //     setInput(input + emoji);
  //   };
  return (
    //   space-x-3 means spacing between the children
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
    >
      <img
        src={session.user.image}
        alt="Profile Picture"
        className="w-11 h-11 rounded-full cursor-pointer"
      ></img>
      {/* divide-y makes a border btween each of the children, so that you dont have to manually add the borders to each element */}
      <div className="w-full divide-y divide-gray-700 ">
        <div className={`${file && "pb-7"}`}>
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
        {!loading && (
          <div className="flex items-end">
            <div className="flex items-center pt-2.5 relative">
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
                  onChange={(e) => addImage(e)}
                  ref={filePickerRef}
                ></input>
              </div>
              <div className="iconDiv">
                <ChartBarIcon className="icon rotate-90"></ChartBarIcon>
              </div>
              <div
                className="iconDiv"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <EmojiHappyIcon className="icon"></EmojiHappyIcon>
              </div>
              <div className="iconDiv">
                <CalendarIcon className="icon"></CalendarIcon>
              </div>
              {/* {showEmojis && (
              <EmojiPicker
                // onSelect={addEmoji}
                // style={{
                //   position: "absolute",
                //   marginTop: "465px",
                //   marginLeft: -40,
                //   maxWidth: "320px",
                //   borderRadius: "20px",
                // }}
                className="absolute mt-[465px] -ml-[40px] max-w-[320px] rounded-[20px]"
                theme="dark"
              />
            )} */}
            </div>
            <button
              className=" xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full h-8 w-20  font-bold shadow-md hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50"
              // if theres no input and theres no file
              disabled={!input.trim() && !file && !loading}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
