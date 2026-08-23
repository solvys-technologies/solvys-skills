export type BlogCategory = "Places" | "Food" | "People";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  author: string;
  cover: "window" | "steps" | "orbit" | "tiles";
};

export const FEATURED_POST: BlogPost = {
  slug: "a-week-without-an-itinerary",
  title: "A week without an itinerary",
  excerpt:
    "What changed when we stopped collecting recommendations and started following the shape of each day.",
  category: "Places",
  readTime: "7 min read",
  author: "Mina Park",
  cover: "window",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-kitchen-at-four",
    title: "The kitchen at four in the afternoon",
    excerpt:
      "Three cooks on prep, a radio just loud enough, and the quiet work behind a busy dinner room.",
    category: "Food",
    readTime: "5 min read",
    author: "Jon Bell",
    cover: "steps",
  },
  {
    slug: "keeping-a-small-shop",
    title: "Keeping a small shop",
    excerpt:
      "A conversation about regulars, useful objects, and knowing when the shelves have enough.",
    category: "People",
    readTime: "6 min read",
    author: "Leah Soto",
    cover: "tiles",
  },
  {
    slug: "the-long-way-to-the-water",
    title: "The long way to the water",
    excerpt:
      "One coastal path, two wrong turns, and a late lunch worth arriving hungry for.",
    category: "Places",
    readTime: "4 min read",
    author: "Mina Park",
    cover: "orbit",
  },
  {
    slug: "notes-on-a-shared-table",
    title: "Notes on a shared table",
    excerpt:
      "Why the best meals often begin before anyone sits down and continue after the plates are cleared.",
    category: "Food",
    readTime: "8 min read",
    author: "Jon Bell",
    cover: "window",
  },
  {
    slug: "mornings-with-sana",
    title: "Mornings with Sana",
    excerpt:
      "The florist opens before the street wakes up. We joined her for the first quiet hour.",
    category: "People",
    readTime: "5 min read",
    author: "Leah Soto",
    cover: "orbit",
  },
  {
    slug: "one-room-three-generations",
    title: "One room, three generations",
    excerpt:
      "Inside a family workshop where every tool has a place and every mark carries a memory.",
    category: "Places",
    readTime: "6 min read",
    author: "Mina Park",
    cover: "tiles",
  },
];
