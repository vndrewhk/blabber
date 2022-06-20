const { useRouter } = require("next/router");
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import styles from "../styles/Home.module.css";
import { useSession, getProviders, getSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import Comment from "../components/Comment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Post from "../components/Post";
const Id = ({ trendingResults, followResults, providers }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const modalState = useSelector((state) => state.modal);

  const [modalStatus, setModalStatus] = useState(modalState.modalStatus);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      });
    }
  }, [db, id]);
  //   query comments
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, [db]);

  console.log(post);
  // to use .data(), have to map it and do it to each value because its a doc collection
  console.log(comments);
  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <div>
      <Head>
        <title>
          {post.username} on Blabber: &#34;{post.text}&#34;
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex bg-black min-h-screen max-w-[1500px]  mx-auto">
        {/* <main> */}
        {/* sidebar is fixed, therefore feed appears to the left of sidebar, we have to set feed to relative */}
        <Sidebar></Sidebar>
        {/* Sidebar */}
        <div className="flex flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px] flex-col">
          <div className="flex px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-4 sticky top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
              <ArrowLeftIcon
                className="text-white h-5 cursor-pointer"
                onClick={() => router.push("/")}
              ></ArrowLeftIcon>
            </div>
            Blab
            {/* <span className="text-white"> text {id}</span> */}
          </div>
          {/* <span>test</span> */}
          <Post id={id} postInfo={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                ></Comment>
              ))}
            </div>
          )}
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        ></Widgets>
        {/* Widgets */}
        <Modal></Modal>
        {/* Modal <- Redux/recoil */}
      </main>
    </div>
  );
};

export default Id;
export async function getServerSideProps(context) {
  let data = {};
  try {
    const trendingData = await fetch("https://jsonkeeper.com/b/NKEV");
    // assume it will always work
    if (trendingData.ok) {
      const trendingResults = await trendingData.json();
      data = { ...data, trendingResults };
    }
  } catch {}
  try {
    const followData = await fetch("https://jsonkeeper.com/b/WWMJ");
    // assume it will always work
    if (followData.ok) {
      const followResults = await followData.json();
      data = { ...data, followResults };
    }
  } catch {}
  const providers = await getProviders();
  const session = await getSession(context);
  data = { ...data, providers, session };

  return {
    props: data,
  };
}