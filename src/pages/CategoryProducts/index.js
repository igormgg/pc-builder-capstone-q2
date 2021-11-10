import { useParams } from "react-router";

const CategoryProducts = () => {
  const { category } = useParams();

  return <h1>{category}</h1>;
};

export default CategoryProducts;
