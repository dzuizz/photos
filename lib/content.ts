export interface Annotation {
  label: string;
  value: string;
}

export const aboutContent = {
  heading: "About",
  paragraphs: [
    "hi",
    "im dzuizz"
  ],
  annotations: [
    { label: "BASED IN", value: "singapore" },
    { label: "BODIES", value: "sony α6400, human" },
  ] as Annotation[],
};

export const contactContent = {
  heading: "Contact",
  intro:
    "hi",
};
