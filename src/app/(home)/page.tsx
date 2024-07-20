import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";
import { Category } from "@/types";

const products: Product[] = [
  {
      id: "1",
      name: "Margharita Pizza",
      description: "This is a very tasty description",
      image: "/pizza-main.png",
      price: 500
  },
  {
      id: "2",
      name: "Margharita Pizza",
      description: "This is a very tasty description",
      image: "/pizza-main.png",
      price: 500
  },
  {
      id: "3",
      name: "Margharita Pizza",
      description: "This is a very tasty description",
      image: "/pizza-main.png",
      price: 500
  },
  {
      id: "4",
      name: "Margharita Pizza",
      description: "This is a very tasty description",
      image: "/pizza-main.png",
      price: 500
  },
  {
      id: "5",
      name: "Margharita Pizza",
      description: "This is a very tasty description",
      image: "/pizza-main.png",
      price: 500
  },
  {
      id: "6",
      name: "Margharita Pizza",
      description: "This is a very tasty description",
      image: "/pizza-main.png",
      price: 500
  },
]

export default async function Home() {
  const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
    next: {
      revalidate: 3600
    }
  });
  if(!categoryResponse.ok)
    throw new Error("Unable to fetch categories");

  const categories: Category[] = await categoryResponse.json();
  console.log(categories)
  return (
    <>
      <section className="bg-white">
        <div className="container flex justify-between items-center py-12">
          <div>
            <h1 className="text-7xl font-black font-sans leading-[1.1]">
              Super Delicious Pizza in <br/>
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Pizza if Your Order Takes More Than 45 Minutes! 
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image alt="Pizzo-Moto" src={"/pizza-main.png"} width={360} height={360}/>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <Tabs defaultValue="pizza" className="mt-2">
            <TabsList>
              {
                categories.map(category => (
                  <TabsTrigger key={category._id} value={category._id} className="text-lg">{category.name}</TabsTrigger>
                ))
              }
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-4 mt-4">
                {
                  products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))
                }
              </div>
            </TabsContent>
            <TabsContent value="beverages">Beverage List</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
