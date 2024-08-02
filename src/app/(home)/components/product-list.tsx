import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ProductCard from "./product-card";
import { Category, Product } from "@/types";

const ProductList = async () => {
  // TODO: Make concurrent requests using Promise.all
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  if (!categoryResponse.ok) throw new Error("Unable to fetch categories");

  const categories: Category[] = await categoryResponse.json();

  // TODO: Add Pagination
  const productsResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=${2}`,
    {
      // TODO : Make tenantId dynamic
      next: {
        revalidate: 3600,
      },
    }
  );
  if (!productsResponse.ok) {
    throw new Error("Unable to fetch Products");
  }
  const products: { data: Product[] } = await productsResponse.json();
  console.log(products);

  return (
    <section>
      <div className="container">
        <Tabs defaultValue={categories[0]._id} className="mt-2">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className="text-lg"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category._id} value={category._id}>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {products.data
                  .filter((x) => x.category?._id === category._id)
                  .map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;
