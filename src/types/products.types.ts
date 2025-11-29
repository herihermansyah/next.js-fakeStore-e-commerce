type dimensions = {
  width: number;
  height: number;
  depth: number;
};

type reviews = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type ProductsTypes = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weigh: number;
  dimensions: dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: reviews[];
  returnPolicy: string;
  meta: meta;
  images: string[];
  thumbnail: string;
};
