import BlogListItem from "@/components/shared/blogItem/BlogListItem";
import ButtonLink from "@/components/shared/buttons/ButtonLink";
import Icon from "@/components/shared/Icon";
import SideBorder from "@/components/shared/SideBorder";
import { Metadata } from "next";
import { Post } from "./models/postModel";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";

export const metadata: Metadata = {
  title: "Prawo do strajku",
};

export default async function HomePage() {
  let posts: Post[] = [];
  let fetchFailed = false;

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/posts?per_page=5&_embed`,
      {
        next: {
          revalidate: false,
          tags: ["posts-latest"],
        },
      },
    );

    if (!response.ok) {
      fetchFailed = true;
    } else {
      posts = await response.json();
    }
  } catch (error) {
    console.error("Błąd pobierania postów na stronie głównej:", error);
    fetchFailed = true;
  }

  return (
    <>
      <section>
        <div className="container flex flex-col gap-10 py-10">
          <div className="text-2xl font-bold">Prawo do strajku</div>
          <div>
            MZZP „Zjednoczeni” reprezentuje pracowników ochrony, hoteli i
            przedszkoli zakładowych w grupie Elbest. Pilnujemy, żeby zmiany
            właścicielskie i restrukturyzacje nie odbywały się kosztem ludzi.
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <ButtonLink
              link={"for-members"}
              className="w-fit "
              variant="primary"
            >
              Dołącz do związku
            </ButtonLink>
            <ButtonLink
              link={"/contact"}
              className="w-fit "
              variant="primary-empty"
            >
              Zgłoś problem w pracy
            </ButtonLink>
          </div>
          <SideBorder />
        </div>
      </section>
      <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-10">
        <div className="p-10 border border-bg-dark border-l-0 border-r-0 sm:border-r">
          <div className="text-accent text-xl">2009</div>
          <div>rok powstania związku</div>
        </div>
        <div className="p-10 border border-bg-dark border-l-0 border-r-0 md:border-r">
          <div className="text-accent text-xl">700+</div>
          <div>reprezentowanych pracowników</div>
        </div>
        <div className="p-10 border border-bg-dark border-l-0 border-r-0 sm:border-r">
          <div className="text-accent text-xl">3</div>
          <div>branże: ochrona, hotelarstwo, edukacja</div>
        </div>
        <div className="p-10 border border-bg-dark border-l-0 border-r-0">
          <div className="text-accent text-xl">24/7</div>
          <div>kontakt w sprawach pilnych</div>
        </div>
      </section>
      <section className="container  pt-16 pb-30">
        <div className="flex justify-between border-b-3 pb-10">
          <h2 className="text-xl font-bold">Ostatnie aktualności</h2>
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
          errorMessage="Błąd ładowania aktualności"
          loadingMessage="Ładowanie aktualności"
        >
          <ul className="flex flex-col gap-4">
            {posts.map((post) => {
              const image = post._embedded?.["wp:featuredmedia"]?.[0];

              return <BlogListItem key={post.id} post={post} image={image} />;
            })}
          </ul>
        </SuspenseErrorBoundary>
      </section>
      <section className="container">
        <h2 className="text-xl font-bold border-b-3 mb-10 pb-10">
          Czym się zajmujemy
        </h2>
        <div className="grid md:grid-cols-3 pb-30">
          <div className="p-6 border border-bg-dark">
            <Icon icon={"shield"} size={30} className={`!bg-accent mb-8`} />
            <div className="font-bold mb-4 text-lg">Ochrona zatrudnienia</div>
            <p>
              Negocjujemy Zakładowe Układy Zbiorowe Pracy i sprzeciwiamy się ich
              jednostronnemu wypowiadaniu.
            </p>
          </div>
          <div className="p-6 border border-bg-dark">
            <Icon icon={"house"} size={30} className={`!bg-accent mb-8`} />
            <div className="font-bold mb-4 text-lg">Sprawy socjalne</div>
            <p>
              Bronimy programów PPE, ubezpieczeń grupowych i innych świadczeń,
              gdy pracodawca chce je ograniczyć.
            </p>
          </div>
          <div className="p-6 border border-bg-dark">
            <Icon icon={"trend"} size={30} className={`!bg-accent mb-8`} />
            <div className="font-bold mb-4 text-lg">Warunki pracy</div>
            <p>
              Reagujemy, gdy czas pracy, upały czy obciążenie obowiązkami
              przekraczają to, co dopuszcza prawo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
