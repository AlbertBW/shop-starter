import Image from "next/image";
import Link from "next/link";
import HeroImage from "~/assets/hero-med.jpg";

export default async function Home() {
  return (
    <main className="animate-fade-in flex flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="bg-highlight-1 group relative w-full md:w-1/2 lg:w-2/3">
          <Image src={HeroImage} alt="Headphones" width={0} height={0} />
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
        <div className="bg-highlight-2 flex h-full w-full flex-col items-center justify-center gap-6 p-8 md:w-1/2 lg:w-1/3">
          <h2 className="text-highlight-1 text-center text-xl font-thin tracking-wide">
            Discover the latest technology
          </h2>
          <h1 className="text-center text-4xl tracking-widest">Technology</h1>
          <Link
            href={"/products"}
            className="bg-primary text-secondary my-1 border px-5 py-4 font-semibold tracking-widest"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </main>
  );
}
