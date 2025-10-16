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

export interface IClient {
  id: bigint,
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  age: bigint
}

export interface ICart {
  id: bigint,
  type: string,
  status: string,
  createDate: string,
  price: bigint
}

