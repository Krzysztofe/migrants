import BlogListItem from "@/components/shared/blogItem/BlogListItem";
import ButtonLink from "@/components/shared/buttons/ButtonLink";
import Icon from "@/components/shared/Icon";
import SideBorder from "@/components/shared/SideBorder";
import { Metadata } from "next";
import { Post } from "./models/postModel";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dość zkazu strajków",
};

export default async function HomePage() {
  let publications: Post[] = [];
  let news: Post[] = [];

  try {
    const [respPublications, respNews] = await Promise.all([
      fetch(
        `${process.env.API_BASE_URL}/posts?per_page=3&categories=5&_embed`,
        {
          next: {
            revalidate: false,
            tags: ["posts-category-5"],
          },
        },
      ),
      fetch(
        `${process.env.API_BASE_URL}/posts?per_page=3&categories=6&_embed`,
        {
          next: {
            revalidate: false,
            tags: ["posts-category-6"],
          },
        },
      ),
    ]);

    if (respPublications.ok) {
      publications = await respPublications.json();
    }

    if (respNews.ok) {
      news = await respNews.json();
    }
  } catch (error) {
    console.error("Błąd pobierania wpisów:", error);
  }

  return (
    <>
      <section>
        <div className="container flex h-[80vh] flex gap-10 py-10 bg-[url('/images/hero-img.png')] bg-cover bg-center">
          <div className="flex-1 flex flex-col  justify-center">
            <h1 className="text-2xl leading-none ">
              DOŚĆ&nbsp;ZAKAZU
              <span className="block origin-left scale-x-[1.25] w-[80%]">
                STRAJKÓW
              </span>
            </h1>
            <div className="mt-6 text-lg">
              Kampania na rzecz zmiany ustawy o rozwiązywaniu sporów zbiorowych.
            </div>
            <div className="flex  sm:flex-row gap-6 mt-6">
              <ButtonLink
                link={"for-members"}
                className="w-fit "
                variant="primary-empty"
              >
                Podpisz się
              </ButtonLink>
              <ButtonLink
                link={"/contact"}
                className="w-fit "
                variant="primary-empty"
              >
                Dołącz
              </ButtonLink>
            </div>
          </div>
          <div className=" flex justify-center items-center hidden lg:flex">
            <Image
              src="/icons/logo-black.png"
              alt="Logo"
              width={150}
              height={100}
              className="w-[400px] h-auto"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>
      <section className="mt-10">
        {" "}
        <div className="container bg-[url('/images/hero-img.png')] bg-cover bg-center h-[40vh]">
          {" "}
        </div>
        <div className="container-sm ">
          <h2 className="text-xl font-extrabold my-10">
            KIM JESTEŚMY I O CO WALCZYMY?
          </h2>
          <p className="text-lg">
            Strajk jest podstawowym demokratycznym prawem i jedynym realnym
            narzędziem pracowników do obrony przed atakami ze strony rządów i
            wielkiego biznesu. Jak pokazują jednak doświadczenia związków
            zawodowych, w Polsce prawo do strajku mamy tylko na papierze. Wciąż
            podlegamy restrykcjom, które Jaruzelski wprowadził w stanie
            wojennym, żeby uniemożliwić strajki i złamać “Solidarność” lat 80.
            Nowe władze III RP z chęcią podtrzymały te restrykcje, gdy
            wprowadzały “nową” ustawę o rozwi... [czytaj dalej]
          </p>
        </div>
      </section>
      <section className="container  pt-16 pb-30">
        <div className="flex justify-between gap-4 border-b-3 pb-10">
          <h2 className="text-xl">PRAWO DO STRAJKU TO FIKCJA</h2>
          <ButtonLink
            link={"/news"}
            className="w-fit h-fit mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
            variant="ghost"
          >
            Wszystkie wpisy{" "}
            {
              <Icon
                icon={"arrow"}
                size={15}
                className={`bg-accent -rotate-90`}
              />
            }
          </ButtonLink>
        </div>
        <SuspenseErrorBoundary
          size="lg"
          errorMessage="Błąd ładowania wpisów"
          loadingMessage="Ładowanie aktualności"
        >
          <ul className="flex flex-col gap-4">
            {publications.map((post) => {
              const image = post._embedded?.["wp:featuredmedia"]?.[0];

              return <BlogListItem key={post.id} post={post} image={image} />;
            })}
          </ul>
        </SuspenseErrorBoundary>
      </section>

      <section className="container  pt-16 pb-30">
        <div className="flex justify-between gap-4 border-b-3 pb-10">
          <h2 className="text-xl">AKTUALNOŚCI</h2>
          <ButtonLink
            link={"/news"}
            className="w-fit h-fit mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
            variant="ghost"
          >
            Wszystkie aktualności{" "}
            {
              <Icon
                icon={"arrow"}
                size={15}
                className={`bg-accent -rotate-90`}
              />
            }
          </ButtonLink>
        </div>
        <SuspenseErrorBoundary
          size="lg"
          errorMessage="Błąd ładowania wpisów"
          loadingMessage="Ładowanie aktualności"
        >
          <ul className="flex flex-col gap-4">
            {news.map((post) => {
              const image = post._embedded?.["wp:featuredmedia"]?.[0];

              return <BlogListItem key={post.id} post={post} image={image} />;
            })}
          </ul>
        </SuspenseErrorBoundary>
      </section>
    </>
  );
}
