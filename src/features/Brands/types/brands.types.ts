// Pagination metadata
export interface IMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

// Single Brand
export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Full API Response
export interface BrandsResponse {
  results: number;
  metadata: IMetadata;
  data: IBrand[];
}
export interface SingleBrandResponse {
  data: IBrand;
}
