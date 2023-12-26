import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";

import Container from "../components/Container";
import Card from "../components/Card";
import * as Statuses from "../components/statuses";

import fetcher from "../lib/fetcher";
import Chart from "../components/Chart";
import Arrow from "../components/icons/Arrow";

function NodePage({ apiData }) {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/status?monitor=${apiData.id}`,
    { refreshInterval: 60000, revalidateOnFocus: false, fallbackData: apiData }
  );

  return (
    <Container>
      <Head>
        <title>Status {data?.name ? `- ${data.name}` : ""}</title>
      </Head>
      <Link
        href="/"
        passHref
        className="w-11/12 sm:w-4/5 bg-primary rounded-xl shadow-lg py-6 px-5 mt-12 mb-20 flex flex-row justify-center cursor-pointer"
      >
        <h1 className="flex flex-row font-semibold text-lg md:text-2xl lg:text-3xl move-arrow cursor-pointer">
          <Arrow className="mr-2 arrow h-6 md:h-8 lg:h-9 pb-1" />
          Go back
        </h1>
      </Link>
      {data?.status === 0 && <Statuses.Paused properties={data} />}
      {data?.status === 1 && <Statuses.NotChecked properties={data} />}
      {data?.status === 2 && <Statuses.Up properties={data} />}
      {data?.status === 8 && <Statuses.SeemsDown properties={data} />}
      {data?.status === 9 && <Statuses.Down properties={data} />}
      <Card className="py-4 px-5 sm:py-6 sm:px-7 md:py-12 md:px-10 mt-4 mb-9 absolute">
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
      <Card className="py-4 px-5 sm:p-8 md:p-10 md:pt-12 mb-8">
        <h1 className="w-full text-center sm:text-4xl text-2xl mb-1 font-semibold">
          Response Times
        </h1>
        <p className="text-base text-center w-full font-normal text-gray-300 tracking-wider">
          Showing from the past 2 days
        </p>
        <Chart responseTimes={data?.response_times || []} />
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
