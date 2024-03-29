import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";
import modalSlice, {
  inputFalse,
  modalFalse,
  toggleModal,
} from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { XCircleIcon } from "@heroicons/react/solid";
import Input from "./Input";

function Modal(props) {
  const modalState = useSelector((state) => state.modal);
  const postState = useSelector((state) => state.postId);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(modalState.modalStatus);
  const [postId, setPostId] = useState(postState.postId);
  //   const [isOpen, setIsOpen] = useRecoilState(modalState);
  //   const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [input, setInput] = useState(modalState.input);
  const router = useRouter();
  const dispatch = useDispatch();

  const setModalFalse = () => {
    dispatch(modalFalse());
  };

  const setModalTrue = () => {
    dispatch(modalTrue());
  };

  const setModalToggle = () => {
    dispatch(toggleModal());
    dispatch(inputFalse());
  };

  useEffect(() => {
    setIsOpen(modalState.modalStatus);
    setInput(modalState.input);
  }, [modalState.modalStatus]);

  useEffect(() => {
    console.log(postState.postId);
    setPostId(postState.postId);
  }, [postState.postId]);
  //   useEffect(() => {
  //     console.log(postState.postId);
  //     setPostId(postState.postId);
  //   }, []);
  // grabs the post using the global post state set by redux

  useEffect(() => {
    if (postId) {
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      });
    }
  }, [db, postId]);
  //   query comments
  useEffect(() => {
    if (postId) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "posts", postId, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
          console.log(snapshot.docs);
        }
      );
      return () => unsubscribe();
    }
  }, [db]);
  const checkIds = () => {
    console.log(postId);
    console.log(postState.postId);
  };
  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      username: session?.user.name,
      email: session?.user.email,
      userImg: session?.user.image,
      timestamp: serverTimestamp(),
    });

    setModalFalse();
    setComment("");

    router.push(`/${postId}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 pt-8"
        onClose={setModalToggle}
      >
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              {!input && (
                <>
                  <div className="flex items-center px-1.5  py-2 border-b border-gray-700">
                    <div
                      className="hover-animation w-9 h-9 flex items-center justify-center xl:px-0 cursor-pointer"
                      onClick={setModalToggle}
                    >
                      <XIcon className="h-[22px] text-white" />
                    </div>
                  </div>
                  <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                    <div className="w-full">
                      <div className="text-[#6e767d] flex gap-x-3 relative">
                        <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                        <img
                          src={post?.userImg}
                          alt=""
                          className="h-11 w-11 rounded-full"
                        />
                        <div>
                          <div className="inline-block group">
                            <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                              {post?.username}
                            </h4>
                            <span className="ml-1.5 text-sm sm:text-[15px]">
                              {post?.email}{" "}
                            </span>
                          </div>{" "}
                          ·{" "}
                          <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                          </span>
                          <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                            {post?.text}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 flex space-x-3 w-full">
                        <img
                          src={session?.user.image}
                          alt=""
                          className="h-11 w-11 rounded-full"
                        />
                        <div className="flex-grow mt-2">
                          <div className="flex-grow mt-2">
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Tweet your reply"
                              rows="2"
                              className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                            />

                            <div className="flex items-center justify-between pt-2.5 w-full">
                              <div className="flex items-center space-x-5">
                                <div className="icon">
                                  <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                                </div>

                                <div className="icon rotate-90">
                                  <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                                </div>

                                <div className="icon">
                                  <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                                </div>

                                <div className="icon">
                                  <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                                </div>
                              </div>
                              <button
                                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                type="submit"
                                onClick={sendComment}
                                disabled={!comment.trim()}
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {input && <Input></Input>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
