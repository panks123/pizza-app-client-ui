import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

const ToppingCard: React.FC<PropType> = ({topping, selectedToppings, handleSelectTopping}) => {
  const isCurrentSelected = !!selectedToppings.find(x => x.id === topping.id);
  return (
    <Button 
      variant={'outline'}
      className={cn('flex flex-col h-42 relative', isCurrentSelected ? "border-primary" : "")}
      onClick={() => isCurrentSelected ? handleSelectTopping(topping, "uncheck") : handleSelectTopping(topping, "check")}
    >
      <Image src={topping.image} alt={topping.name} width={80} height={80}/>
      <h4>{topping.name}</h4>
      <p>&#8377;{topping.price}</p>
      {isCurrentSelected && <CircleCheck className='absolute top-1 right-1 text-primary'/>}
    </Button>
  )
}

export type Topping =  {
  id: number;
  name: string;
  image: string;
  price: number;
  isAvailable: boolean;
};

type PropType = {
  topping: Topping;
  selectedToppings: Topping[];
  handleSelectTopping: (topping: Topping, action: "check" | "uncheck") => void;
}

export default ToppingCard
