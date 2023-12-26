import Link from "next/link";
import Card from "./Card";
import { useRouter } from "next/router";
import History from "./icons/History";
import Circle from "./icons/Circle";

function NodeWrapper({ children, id, className }) {
  const router = useRouter();

  return (
    <Card className="p-8 md:py-14 md:px-10 mb-5 text-center">
      <h1
        className={`inline-flex justify-center w-full font-semibold relative ${
          router.asPath === "/"
            ? "text-xl md:text-3xl lg:text-4xl"
            : "text-3xl md:text-4xl lg:text-5xl"
        } ${className}`}
      >
        <Circle animate={router.asPath !== "/"} />
        <span>{children}</span>
        {router.asPath === "/" && (
          <Link
            href={`/${id}`}
            passHref
            className="font-semibold hover:text-gray-200 absolute right-0"
            draggable={false}
            title="Historical Uptime"
          >
            <History className="w-full h-7 md:h-8 lg:h-10" />
          </Link>
        )}
      </h1>
    </Card>
  );
}

export default NodeWrapper;
