import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, [db]);

  const checkPosts = () => {
    posts.forEach((post) => {
      console.log(post.data);
    });
    console.log(posts);
  };
  return (
    <>
      {posts.length === 0 && <h1 className="text-white">Loading</h1>}
      {/* <button onClick={checkPosts}>clck here</button>{" "} */}
      <div className="pb-72">
        {posts.length > 0 &&
          posts.map((post) => {
            // console.log(post["_document"].data.value.mapValue.fields);
            return (
              <Post
                postInfo={post.data()}
                key={
                  post["_document"].data.value.mapValue.fields.id.stringValue +
                  post["_document"].data.value.mapValue.fields.timestamp
                    .timestampValue
                }
                id={post.id}
              ></Post>
            );
          })}{" "}
      </div>
    </>
  );
}

export default Posts;
