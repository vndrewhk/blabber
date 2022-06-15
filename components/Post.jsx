import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  addDoc,
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
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { modalTrue, toggleModal } from "../store/modalSlice";
import { setPostId } from "../store/postSlice";

function Post({ postInfo, id }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(modalState);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const postPage = false;
  const modalState = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const router = useRouter();

  const modalChange = () => {
    dispatch(modalTrue());
  };

  const postIdChange = (id) => {
    dispatch(setPostId(id));
  };

  //   grabs the like list from database and sets it for the post
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  //   checks if the current user is one of the users taht liked the post
  useEffect(() => {
    setLiked(
      likes.map((like) => {
        if (like.email === session?.user?.email) {
          return true;
        }
      })
    );
    // console.log("hi");
    // console.log(
    //   likes.findIndex((like) => {
    //     // console.log(like.data().email);
    //     // console.log(session?.user?.email);
    //     // console.log((like.email === session?.user.email) !== -1);
    //     like.email == session?.user?.email;
    //   })
    // );
  }, [likes]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      //                 deleteDoc(doc(db, "posts", id));
      setLiked(false);
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        email: session.user.email,
      });
    }
  };

  //   console.log(postInfo);
  //   console.log(id);

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/${id}`)}
    >
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
              <span className="hover:underline text-sm sm:text-[15px]">
                <Moment fromNow>{postInfo?.timestamp?.toDate()}</Moment>
              </span>{" "}
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
              // stopPropagation prevents other div onClicks from being triggered
              e.stopPropagation();
              //   setPostId(id);
              //   setIsOpen(true);
              modalChange();
              postIdChange(id);
              //   console.log("hi");
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
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
            <div className="icon group-hover:bg-pink-600/10">
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
            )}
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
