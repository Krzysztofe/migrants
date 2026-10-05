"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  alt: string;
  image:
    | {
        source_url: string;
        alt_text: string;
      }
    | undefined;
};

const PostImage = ({ image, alt }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-100 w-full shrink-0 md:w-150">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-light" />
      )}

      {image ? (
        <Image
          src={image.source_url}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-light">
          <Image
            src="/icons/logo-black.png"
            alt="Logo"
            width={150}
            height={100}
            priority
            unoptimized
            className={`h-auto w-37.5 transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}
    </div>
  );
};

export default PostImage;
