"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/buttons/Button";

type Props = {
  initialSearch: string;
  currentCategory: number | null;
};

const SearchForm = ({ initialSearch, currentCategory }: Props) => {
  const router = useRouter();

  const [search, setSearch] = useState(initialSearch);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (currentCategory !== null) {
      params.set("category", currentCategory.toString());
    }

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();

    router.push(query ? `/news?${query}` : "/news");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Wyszukaj wpisy..."
          className="border-2 p-4"
        />

        <Button message="Szukaj" variant="primary-empty" />
      </form>

      <p className={`mt-8 ${search ? "visible" : "invisible"}`}>
        Wyniki wyszukiwania dla: <strong>{search}</strong>
      </p>
    </>
  );
};

export default SearchForm;
