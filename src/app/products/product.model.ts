export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;

  stateStandard: string;
  diameter: string;
  steelGrade: string;
  height: number,
  outerDiameter: number,
  innerDiameter: number,
  species: string,
  length: string,
  threadLength: string,
  threadPitch: number,
  spannerSize: number,
  weightKg: number,
  plateDimensions: string,
  anchorSpecifications: string
}