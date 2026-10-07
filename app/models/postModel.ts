type PostMeta = {
  event_date?: string;
  event_time?: string;
  event_location?: string;
};

export type Post = {
  id: number;
  slug: string;
  date: string;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  content: {
    rendered: string;
  };
  categories: number[];
  author: number;
  tags: number[];
  featured_media: number;

  meta?: PostMeta;

  _embedded?: {
    ["wp:featuredmedia"]?: {
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium?: {
            source_url: string;
          };
        };
      };
    }[];
  };
};
