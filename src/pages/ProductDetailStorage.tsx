import { ProductTypes } from "./ProductDetails";

type ObjectWithKeys<T, K extends keyof T> = {
  [P in K]: T[P];
};

type props = ObjectWithKeys<ProductTypes, "storage">;

export default function ProductDetailStorage(props: props) {
  const { storage } = props;
  return (
    <p>
      <strong>Storage instructions:</strong> {storage}
    </p>
  );
}
