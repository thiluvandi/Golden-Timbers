export type SpeciesCategory =
  | "imported-teak"
  | "pine-softwood"
  | "structural-hardwood"
  | "veneer-plywood";

export interface CutSizes {
  logGirths: string;
  plankThickness: string;
  lengthRange: string;
  seasoning: string;
}

export interface WoodSpecies {
  id: string;
  name: string;
  origin: string;
  category: SpeciesCategory;
  grade: string;
  density: string;
  grainType: string;
  moistureContent: string;
  bestFor: string[];
  tone: [string, string];
  description: string;
  cutSizes: CutSizes;
}

export interface CategoryDef {
  id: SpeciesCategory | "all";
  label: string;
}

export interface ServiceDef {
  icon: "sawblade" | "flame" | "door" | "truck";
  title: string;
  description: string;
  points: string[];
}
