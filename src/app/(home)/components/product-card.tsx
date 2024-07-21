import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/types";
import ProductModal from "./product-modal";

const ProductCard: React.FC<PropType> = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <Image src={product.image} alt="pizza-image" width={150} height={150} />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>
          <span>From </span>
          <span className="font-bold"> ₹100</span>
        </p>
        <ProductModal product={product}/>
      </CardFooter>
    </Card>
  );
};

type PropType = {
  product: Product;
};

export default ProductCard;
