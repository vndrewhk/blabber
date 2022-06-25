import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import styles from "../styles/Home.module.css";
import { useSession, getProviders, getSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import NotificationFeed from "../components/NotificationFeed";

export default function notifications({
  trendingResults,
  followResults,
  providers,
}) {
  // we will use a hook to get the session

  const { data: session } = useSession();

  // if (!session) {
  //   return <Login providers={providers} />;
  // }

  return (
    <div>
      <Head>
        <title>Blabber | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex bg-black min-h-screen max-w-[1500px]  mx-auto">
        {/* <main> */}
        {/* sidebar is fixed, therefore feed appears to the left of sidebar, we have to set feed to relative */}
        <Sidebar></Sidebar>
        {/* Sidebar */}
        <NotificationFeed></NotificationFeed> {/* Feed */}
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
}

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
