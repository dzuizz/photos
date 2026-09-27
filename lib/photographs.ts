import house from "@/pictures/house.jpg";
import flower from "@/pictures/flower.jpg";
import motorbike from "@/pictures/motorbike.jpg";
import curvy from "@/pictures/curvy.jpg";
import farm from "@/pictures/farm.jpg";
import cow from "@/pictures/cow.jpg";
import dystopia from "@/pictures/dystopia.jpg";
import frog from "@/pictures/frog.jpg";
import paddy from "@/pictures/paddy.jpg";
import tiger from "@/pictures/tiger.jpg";
import indomaret from "@/pictures/indomaret.jpg";
import nosmile from "@/pictures/nosmile.jpg";
import sunHappy from "@/pictures/sun-happy.jpg";

export const categories = [
  "All works",
  "Landscape",
  "Street",
  "Nature",
] as const;
export type Category = (typeof categories)[number];

export const photographs = [
  {
    id: "house",
    title: "A place to pause",
    category: "Street",
    image: house,
    alt: "A quiet house entrance surrounded by greenery and pink flowering vines",
  },
  {
    id: "flower",
    title: "Small wonder",
    category: "Nature",
    image: flower,
    alt: "A tiny pale pink flower nestled among broad green leaves",
  },
  {
    id: "motorbike",
    title: "Passing through",
    category: "Street",
    image: motorbike,
    alt: "A moving motorcycle passing a weathered wall and metal gates",
  },
  {
    id: "curvy",
    title: "The long way around",
    category: "Landscape",
    image: curvy,
    alt: "An aerial view of a winding river threading through fields and settlements",
  },
  {
    id: "farm",
    title: "Room to grow",
    category: "Landscape",
    image: farm,
    alt: "Lush green farmland seen through softly blurred leaves",
  },
  {
    id: "cow",
    title: "A quiet presence",
    category: "Nature",
    image: cow,
    alt: "Close portrait of a brown cow with long curved horns",
  },
  {
    id: "dystopia",
    title: "Concrete horizon",
    category: "Landscape",
    image: dystopia,
    alt: "Hazy city skyline with tall apartment buildings against distant hills",
  },
  {
    id: "frog",
    title: "Look a little closer",
    category: "Nature",
    image: frog,
    alt: "A small camouflaged frog on a moss-covered surface",
  },
  {
    id: "paddy",
    title: "Fields from above",
    category: "Landscape",
    image: paddy,
    alt: "A patchwork of agricultural fields and buildings seen from the air",
  },
  {
    id: "tiger",
    title: "In stillness",
    category: "Nature",
    image: tiger,
    alt: "A tiger looking to the side in soft natural light",
  },
  {
    id: "indomaret",
    title: "Everyday velocity",
    category: "Street",
    image: indomaret,
    alt: "Two helmeted riders on a scooter passing a convenience store in a blur",
  },
  {
    id: "nosmile",
    title: "Last light",
    category: "Landscape",
    image: nosmile,
    alt: "Warm setting sun over green fields, rooftops, and distant hills",
  },
  {
    id: "sun-happy",
    title: "A brighter outlook",
    category: "Landscape",
    image: sunHappy,
    alt: "The same golden sunset with a playful smile drawn on the sun",
  },
] satisfies {
  id: string;
  title: string;
  category: Category;
  image: typeof house;
  alt: string;
}[];

export type Photograph = (typeof photographs)[number];
