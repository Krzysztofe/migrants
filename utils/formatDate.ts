export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatEventDate = (date: string) => {
  const eventDate = new Date(`${date}T00:00:00`);

  return {
    day: new Intl.DateTimeFormat("pl-PL", {
      day: "2-digit",
    }).format(eventDate),

    month: new Intl.DateTimeFormat("pl-PL", {
      month: "short",
    })
      .format(eventDate)
      .replace(".", "")
      .toUpperCase(),

    weekday: new Intl.DateTimeFormat("pl-PL", {
      weekday: "short",
    })
      .format(eventDate)
      .replace(".", "")
      .toUpperCase(),
  };
};
