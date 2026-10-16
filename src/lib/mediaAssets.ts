import manufacturing from "@/assets/manufacturing.jpg";
import leader from "@/assets/leader.jpg";
import founders from "@/assets/founders.jpg";
import energy from "@/assets/energy.jpg";

const getImg = (img: unknown): string =>
  typeof img === "string" ? img : (img as { src?: string })?.src || "";

export const imgManufacturing = getImg(manufacturing);
export const imgLeader = getImg(leader);
export const imgFounders = getImg(founders);
export const imgEnergy = getImg(energy);
