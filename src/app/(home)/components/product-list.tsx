import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./product-card";
import { Category, Product } from "@/types";

const ProductList = async ({searchParams}: {searchParams: {tenantId: string}}) => {
  // TODO: Make concurrent requests using Promise.all
  console.log("searchParams=>>", searchParams)
  console.log("TenantId=>>", searchParams.tenantId) 
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
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=${searchParams.tenantId}`,
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
