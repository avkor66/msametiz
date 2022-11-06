export interface IProduct {
  name: string,
  title: string,
  gost: IGost[],
  desc: string[],
  images: IImages[],
}

interface IGost {
  name: string,
  description: string,
}

interface IImages {
  name: string,
  src: string,
  alt: string,
}