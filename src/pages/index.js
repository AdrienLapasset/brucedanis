import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import { ILLUSTRATIONS_QUERY, EVENTS_QUERY } from "../../sanity/lib/queries";
import dynamic from "next/dynamic";
import IllustrationsGrid from "@/components/IllustrationsGrid";
import HomeFooter from "@/components/HomeFooter";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useContext } from "react";
import { Context } from "@/app/Context";

const IllustrationsPreview = dynamic(() =>
  import("@/components/sanityPreview/IllustrationsPreview")
);

export default function Home({ illustrations, draftMode, events }) {
  const { isFirstLoad, setIsFirstLoad } = useContext(Context);
  useEffect(() => {
    const onPageLoad = () => {
      setIsFirstLoad(true);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Bruce d'Anis</title>
        <meta property="og:title" content="Bruce d'Anis" key="title" />
      </Head>
      {draftMode ? (
        <IllustrationsPreview illustrations={illustrations} />
      ) : (
        isFirstLoad && <IllustrationsGrid illustrations={illustrations} />
      )}
      <HomeFooter events={events} />
    </>
  );
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const illustrations = await client.fetch(ILLUSTRATIONS_QUERY, {
    cache: "no-store",
  });
  const events = await client.fetch(EVENTS_QUERY, { cache: "no-store" });

  return {
    props: {
      illustrations,
      events,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};
