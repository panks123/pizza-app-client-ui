import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductList from "./components/product-list";
import { Suspense } from "react";
import ProductListSkeleton from "./components/skeletons/product-list-skeleton";

export default async function Home({searchParams}: {searchParams: {tenantId: string}}) {
  
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
            <Image alt="Pizzo-Moto" src={"/pizza-main.png"} width={360} height={360} />
          </div>
        </div>
      </section>
      <Suspense fallback={<ProductListSkeleton/>}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
