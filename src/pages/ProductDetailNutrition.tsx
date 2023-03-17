import { ProductTypes } from "./ProductDetails";

type ObjectWithKeys<T, K extends keyof T> = { [P in K]: T[P] };

type props = ObjectWithKeys<ProductTypes, "nutrition">;

export default function ProductDetailNutrition({ nutrition }: props) {
  const { protein, carbs, fat, salt } = nutrition;

  return (
    <table className="table table-nutrition">
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Protein</td>
          <td>{protein}g</td>
        </tr>
        <tr>
          <td>Carbohydrates</td>
          <td>{carbs}g</td>
        </tr>
        <tr>
          <td>Fat</td>
          <td>{fat}g</td>
        </tr>
        <tr>
          <td>Salt</td>
          <td>{salt}g</td>
        </tr>
      </tbody>
    </table>
  );
}
