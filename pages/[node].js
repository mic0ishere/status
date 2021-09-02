import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";

import Container from "../components/Container";
import Card from "../components/Card";
import * as Statuses from "../components/statuses";

const fetcher = (url) => fetch(url).then((r) => r.json());

function NodePage({ apiData }) {
  const { id } = apiData;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/status?monitor=${id}`,
    { refreshInterval: 60000, revalidateOnFocus: false, fallbackData: apiData }
  );
  const [loadingGraph, setLoadingGraph] = useState("1");
  useEffect(() => {
    const interval = setInterval(async () => {
      setLoadingGraph("2");
      document.querySelector("iframe").contentWindow.location.reload();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Head>
        <title>{data?.name} - Status | mic0</title>
      </Head>
      <Link href="/" passHref>
        <div className="w-11/12 sm:w-4/5 card-color rounded-xl shadow-lg py-4 px-5 mt-12 mb-20 flex flex-row justify-center cursor-pointer">
          <h1 className="font-semibold text-base sm:text-lg md:text-2xl lg:text-3xl move-arrow cursor-pointer">
            <i aria-hidden className="fas fa-arrow-left mr-6 arrow"></i>
            Go back
          </h1>
        </div>
      </Link>
      {data?.status === 0 && <Statuses.Paused properties={data} />}
      {data?.status === 1 && <Statuses.NotChecked properties={data} />}
      {data?.status === 2 && <Statuses.Up properties={data} />}
      {data?.status === 8 && <Statuses.SeemsDown properties={data} />}
      {data?.status === 8 && <Statuses.Down properties={data} />}
      <Card className="py-4 px-5 sm:py-6 sm:px-7 md:py-14 md:px-10 mt-4 mb-9 absolute">
        <h1 className="w-full text-center sm:text-4xl text-2xl mb-6 font-semibold">
          Uptime Ratio
        </h1>
        <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-4 md:grid-rows-1 justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-solid divide-gray-700 w-11/12">
          <div className="font-semibold text-lg sm:text-2xl flex flex-col py-3 md:py-0">
            {data?.uptime_ratio["24H"]}%
            <span className="text-base font-normal text-gray-300 tracking-wider">
              Last 24 hours
            </span>
          </div>
          <div className="font-semibold text-lg sm:text-2xl flex flex-col md:pl-3 py-3 md:py-0">
            {data?.uptime_ratio["7D"]}%
            <span className="text-base font-normal text-gray-300 tracking-wider">
              Last 7 days
            </span>
          </div>
          <div className="font-semibold text-lg sm:text-2xl flex flex-col md:pl-3 py-3 md:py-0">
            {data?.uptime_ratio["30D"]}%
            <span className="text-base font-normal text-gray-300 tracking-wider">
              Last 30 days
            </span>
          </div>
          <div className="font-semibold text-lg sm:text-2xl flex flex-col md:pl-3 py-3 md:py-0">
            {data?.uptime_ratio["all"]}%
            <span className="text-base font-normal text-gray-300 tracking-wider">
              All time
            </span>
          </div>
        </div>
      </Card>
      <Card className="py-4 px-5 sm:py-6 sm:px-7 md:py-14 md:px-10 mb-5 absolute">
        {data?.response_times ? (
          <>
            <h1 className="w-full text-center sm:text-4xl text-2xl mb-1 font-semibold">
              Response Times
            </h1>
            <p className="text-base text-center w-full font-normal text-gray-300 tracking-wider mb-6">
              Showing from the past 2 days
            </p>
            <iframe
              src={`/graph/${id}`}
              className="w-full relative top-0"
              onLoad={(e) => {
                e.target.height =
                  e.target.contentWindow.document.body.scrollHeight + 20 + "px";
                setTimeout(
                  () => setLoadingGraph(false),
                  loadingGraph === "1" ? 200 : 0
                );
              }}
            />
            {loadingGraph && (
              <div className="flex flex-col justify-center items-center absolute inset-0  overflow-x-hidden overflow-y-auto z-50 card-color rounded-xl shadow-lg h-full w-full outline-none focus:outline-none text-center">
                <h1 className="font-semibold text-3xl">
                  {loadingGraph === "1"
                    ? "Loading graph..."
                    : "Updating graph..."}
                </h1>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center absolute inset-0  overflow-x-hidden overflow-y-auto z-50 card-color rounded-xl shadow-lg h-full w-full outline-none focus:outline-none text-center">
            <h1 className="text-lg">
              History response time data will be available soon
            </h1>
          </div>
        )}
      </Card>
    </Container>
  );
}
export async function getServerSideProps(context) {
  const statusNode = context.params.node;
  const json = await fetcher(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/status?monitor=${statusNode}`
  );
  return {
    props: {
      apiData: json,
    },
    notFound: json.id != statusNode,
  };
}

export default NodePage;
