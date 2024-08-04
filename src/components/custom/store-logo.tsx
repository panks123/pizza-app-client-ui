'use client';
import { Pizza } from "lucide-react";
import React from "react";
import { useRouter, useSearchParams } from 'next/navigation';

const StoreLogo = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer bg-[#3b2323fc] p-0 pr-2 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]"
      onClick={() => router.push(`/?tenantId=${searchParams.get('tenantId')}`)}
    >
      <div className="border-primary border-2 p-1.5 rounded-full">
        <Pizza className="text-primary" />
      </div>
      <span className="font-black text-primary">PizzoMoto</span>
    </div>
  );
};

export default StoreLogo;
