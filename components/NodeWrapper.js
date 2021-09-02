import Link from "next/link";
import React from "react";
import Card from "./Card";
import { useRouter } from "next/router";

function NodeWrapper({ children, id }) {
  const router = useRouter();

  return (
    <Card className="py-4 px-5 sm:py-6 sm:px-7 md:py-14 md:px-10 mb-5 text-center">
      <h1
        className={`font-semibold relative ${
          router.asPath === "/"
            ? "text-base sm:text-lg md:text-2xl lg:text-4xl"
            : "text-lg sm:text-xl md:text-3xl lg:text-5xl"
        }`}
      >
        {children}
        {router.asPath === "/" && (
          <Link href={`/${id}`}>
            <a
              className="font-semibold hover:text-gray-200 absolute right-0"
              draggable={false}
              title="Historical Uptime"
            >
              <i aria-hidden className="fas fa-history"></i>
            </a>
          </Link>
        )}
      </h1>
    </Card>
  );
}

export default NodeWrapper;
