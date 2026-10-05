import BlogListItem from "@/components/shared/blogItem/BlogListItem";
import ButtonLink from "@/components/shared/buttons/ButtonLink";
import Icon from "@/components/shared/Icon";
import SideBorder from "@/components/shared/SideBorder";
import { Metadata } from "next";
import { Post } from "./models/postModel";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";
import Image from "next/image";
import FirstBlogItem from "@/app/_components/BlogListHome";
import BlogListHome from "@/app/_components/BlogListHome";
import AccentHeader from "@/components/shared/headers/AccentHeader";

export const metadata: Metadata = {
  title: "Dość zakazu strajków",
};

export default async function HomePage() {
  let publications: Post[] = [];
  let news: Post[] = [];

  try {
    const [respNews, respPublications] = await Promise.all([
      fetch(
        `${process.env.API_BASE_URL}/posts?per_page=3&categories=5&_embed`,
        {
          next: {
            revalidate: 60,
            tags: ["posts-category-5"],
          },
        },
      ),
      fetch(
        `${process.env.API_BASE_URL}/posts?per_page=3&categories=6&_embed`,
        {
          next: {
            revalidate: 60,
            tags: ["posts-category-6"],
          },
        },
      ),
    ]);

    if (respPublications.ok) {
      publications = await respPublications.json();
      console.log("", publications.length);
    }

    if (respNews.ok) {
      news = await respNews.json();
    }
  } catch (error) {
    console.error("Błąd pobierania wpisów:", error);
  }

  return (
    <>
      <section className="bg-[url('/images/hero-img.png')] bg-cover bg-center">
        <div className="container flex h-[60vh] md:h-[80vh] flex gap-10 py-10 ">
          <div className="flex-1 flex flex-col  justify-center">
            <h1 className="text-2xl leading-none ">
              DOŚĆ&nbsp;ZAKAZU
              <span className="block origin-left scale-x-[1.25] w-[80%]">
                STRAJKÓW
              </span>
            </h1>
            <div className="my-6 text-lg text-white lg:w-2/3">
              Kampania na rzecz zmiany ustawy o rozwiązywaniu sporów zbiorowych.
            </div>
            <div className="flex  sm:flex-row gap-6 mt-6">
              <ButtonLink
                link={"join"}
                className="w-fit "
                variant="primary-empty"
              >
                Dołącz
              </ButtonLink>
              <ButtonLink link={"sign-in"} className="w-fit " variant="primary">
                Podpisz się
              </ButtonLink>
            </div>
          </div>
          <div className=" flex justify-center items-center hidden xl:flex">
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
        {/* <div className="container bg-[url('/images/hero-img.png')] bg-cover bg-center h-[40vh]">
          {" "}
        </div> */}
        <div className="container">
          <div className=" my-22 lg:flex  gap-10">
            <div className="flex-1 ">
              <AccentHeader message="KIM JESTEŚMY I O CO WALCZYMY?" />
            </div>
            <div className="flex-1">
              <p className="">
                Strajk jest podstawowym demokratycznym prawem i jedynym realnym
                narzędziem pracowników do obrony przed atakami ze strony rządów
                i wielkiego biznesu.
              </p>
              <p className="mt-8">
                Jak pokazują jednak doświadczenia związków zawodowych, w Polsce
                prawo do strajku mamy tylko na papierze. Wciąż podlegamy
                restrykcjom, które Jaruzelski wprowadził w stanie wojennym, żeby
                uniemożliwić strajki i złamać “Solidarność” lat 80. Nowe władze
                III RP z chęcią podtrzymały te restrykcje, gdy wprowadzały
                “nową” ustawę o rozwi...
              </p>
              <ButtonLink
                link={"/about"}
                className="w-fit mt-8 h-fit font-bold text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
                variant="ghost"
              >
                Czytaj dalej{" "}
                {
                  <Icon
                    icon={"arrow"}
                    size={15}
                    className={`bg-accent -rotate-90 font-bold`}
                  />
                }
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container pb-12">
          <SideBorder />
          <div className="lg:flex justify-between gap-4 pb-10 mt-12">
            <h2 className="text-lg">AKTUALNOŚCI</h2>
            <ButtonLink
              link={"/news"}
              className="w-fit font-bold h-fit mt-6 lg:mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
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
            <ul className="grid lg:grid-cols-5 gap-8">
              {news.map((post, idx) => {
                const image = post._embedded?.["wp:featuredmedia"]?.[0];

                return (
                  <BlogListHome
                    key={post.id}
                    post={post}
                    image={image}
                    idx={idx}
                  />
                );
              })}
            </ul>
          </SuspenseErrorBoundary>
        </div>
      </section>
      <section>
        <div className="container pb-12">
          <SideBorder />
          <div className="lg:flex justify-between gap-4 pb-10 mt-12">
            <h2 className="text-lg">PRAWO DO STRAJKU TO FIKCJA</h2>
            <ButtonLink
              link={"/news"}
              className="w-fit font-bold h-fit mt-6 lg:mt-auto text-accent flex items-center gap-3 border-b border-transparent hover:border-accent"
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
            <ul className="grid lg:grid-cols-5 gap-8">
              {publications.map((post, idx) => {
                const image = post._embedded?.["wp:featuredmedia"]?.[0];

                return (
                  <BlogListHome
                    key={post.id}
                    post={post}
                    image={image}
                    idx={idx}
                  />
                );
              })}
            </ul>
          </SuspenseErrorBoundary>
        </div>
      </section>
    </>
  );
}
