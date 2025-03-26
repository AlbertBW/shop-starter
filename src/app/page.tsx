import Image from "next/image";
import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import HomeProducts, {
  HomeProductsSkeleton,
} from "./_components/home-products";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  void api.product.getAll.prefetch({
    limit: 3,
    orderBy: "latest",
  });

  void api.product.getAll.prefetch({
    limit: 3,
    orderBy: "popular",
  });

  return (
    <HydrateClient>
      <main className="flex animate-fade-in flex-col items-center justify-center gap-4">
        <div className="flex h-full w-full flex-col md:flex-row">
          <div className="group relative w-full bg-highlight-1 md:w-1/2 lg:w-2/3">
            <Image
              src="https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/hero-med-RIlp74S0NwhdxY7z5VqPjZ3hc0M09B.jpg"
              alt="hero"
              priority={true}
              width={1920}
              height={1920}
              className="h-auto w-full"
            />
            <div className="absolute bottom-2 right-2 rounded bg-black/30 px-2 py-1 text-[10px] text-white/80 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100">
              Photo by{" "}
              <a
                href="https://unsplash.com/@minimalsayan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                className="transition-colors hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sayan Majhi
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/a-pair-of-headphones-sitting-next-to-a-keyboard-FFMcFwIUM5Y?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                className="transition-colors hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-highlight-2 p-8 md:w-1/2 lg:w-1/3">
            <h2 className="text-center text-xl font-thin tracking-wide text-highlight-1">
              Discover the latest technology
            </h2>
            <h1 className="text-center text-4xl tracking-widest">Technology</h1>
            <Link
              href={"/products"}
              className="my-1 border bg-highlight-1 px-5 py-4 font-semibold tracking-widest text-highlight-2"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        <div>
          <h2 className="my-10 text-center text-3xl font-thin tracking-wide text-highlight-1">
            Latest Products
          </h2>
          <Suspense fallback={<HomeProductsSkeleton />}>
            <HomeProducts orderBy="latest" />
          </Suspense>
          <div className="mt-6 flex justify-center">
            <Link
              href="/products"
              className="bg-highlight-1 px-6 py-3 font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
            >
              View All Latest
            </Link>
          </div>
        </div>

        <div>
          <h2 className="my-10 text-center text-3xl font-thin tracking-wide text-highlight-1">
            Popular Products
          </h2>
          <Suspense fallback={<HomeProductsSkeleton />}>
            <HomeProducts orderBy="popular" />
          </Suspense>
          <div className="mt-6 flex justify-center">
            <Link
              href="/products"
              className="bg-highlight-1 px-6 py-3 font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
            >
              View All Popular
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
