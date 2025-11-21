export interface IProduct {
  name: string,
  title: string,
  gost: IGost[],
  desc: string,
  description: string[],
  images: IImages[],
}

export interface IGost {
  name: string,
  description: string,
}

export interface IImages {
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

export interface IOrders {
  guestId: string,
  sessionId: string,
  device: string,
  status: string,
  cart: ICartSmall,
  contact: {
    name: string,
    phone: string,
    email: string
  },
  userMeta: {
    ip: string,
    userAgent: string,
    referer: string,
    createdAt: Date
  },
}
export interface ICartSmall {
  height: number | undefined,
  species: string;
  stateStandard: string;
  diameter: string,
  length: string;
  threadLength: string;
  steelGrade: string;
  execution: string;
  quantity: number | undefined;
  delivery: boolean;
  volume: number;
  comment: string
}

export interface ICart {
  threadPitch: number | undefined,
  height: number | undefined,
  outerDiameter: number | undefined,
  innerDiameter: number | undefined,
  species: string;
  stateStandard: string;
  stateStandards: string[];
  diameter: string,
  diameters: string[];
  length: string;
  lengths: string[];
  threadLength: string;
  threadLengths: string[];
  steelGrade: string;
  steelGrades: string[];
  execution: string;
  quantity: number | undefined;
  delivery: boolean;
  volume: number;
  comment: string
}

export interface IMaterials {
  id: number;
  content: string,
  dimensions: string,
  comment: string,
  steelGrade: string,
  productName: string,
  standard: string,
  parameter: string,
  weight: string,
  numberOfPieces: string,
  quantityWeight: string,
  unitOfMeasurement: string,
  price: string,
  note: string,
  linkPhoto: string
}

interface IPageableMaterials {
  "pageNumber": number,
  "pageSize": number,
  "sort": {
    "empty": boolean,
    "sorted": boolean,
    "unsorted": boolean
  },
  "offset": number,
  "paged": boolean,
  "unpaged": boolean
}

export interface ISupplierMaterials {
  content: IMaterials[],
  pageable: IPageableMaterials,
  last: false,
  totalPages: number,
  totalElements: number,
  first: boolean,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean,
  },
  numberOfElements: number,
  empty: boolean
}

export interface IWasherStandard {
  description: string,
  file: string,
  image: string,
  link: string,
  standard: string,
  title: string,
  type: string,
  steelGrades: ISteelGrade[],
  washerSizes: IWasherSize[]
}

interface IWasherSize {
  nominal_thread_diameter: number,
  inner_diameter: number,
  outer_diameter: number | null,
  purpose: string,
  size: string,
  thickness: number,
  width_b: number | null,
}

export interface ISteelStandard {
  name: string,
  file: string,
  images: string,
  link: string,
  title: string,
  grades: ISteelGrade[]
}

export interface ISteelGrade {
  steelGradeName: string,
  description: string,
  substitutes: string,
  weldability: string,
  application: string,
  density: number,
}

