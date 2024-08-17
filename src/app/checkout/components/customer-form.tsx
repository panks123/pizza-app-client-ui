'use client';
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, CreditCard } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/lib/http/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Customer } from "@/types";
import AddAddress from "./add-address";

const CustomerForm = () => {
    const {data: customer, isLoading} = useQuery<Customer>({
        queryKey: ['customer'],
        queryFn: async () => {
          return await getCustomer().then(res => res.data);
        }
    })
    if(isLoading) return <div className="flex container gap-6 mt-16">
      <Card className="w-3/5 border-none">
        <CardHeader>
          <Skeleton className="w-1/3 h-12" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <div className="flex items-center space-x-2">
            <Skeleton className="w-1/2 h-20" />
            <Skeleton className="w-1/2 h-20" />
          </div>
        </CardHeader>
      </Card>
    </div>
    return (
    <div className="flex container gap-6 mt-16">
      <Card className="w-3/5 border-none">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                type="text"
                className="w-full"
                defaultValue={customer?.firstName}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                className="w-full"
                defaultValue={customer?.lastName}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                className="w-full"
                defaultValue={customer?.email}
                disabled
              />
            </div>
            <div className="grid gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Address</Label>
                  {
                    customer && 
                    <AddAddress customerId={customer._id} />
                  }
                </div>
                <RadioGroup
                  defaultValue="option-one"
                  className="grid grid-cols-2 gap-6 mt-2"
                >
                  {
                    customer?.addresses.map((address) => (<Card key={address.text} className="p-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"option-one"} id={"option-one"} />
                        <Label htmlFor={"option-one"} className="leading-normal">
                          {address.text}
                        </Label>
                      </div>
                    </Card>))
                  }
                </RadioGroup>
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Payment Mode</Label>
              <RadioGroup className="flex gap-6">
                <div className="w-36">
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                    aria-label="card"
                  />
                  <Label
                    htmlFor={"card"}
                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard size={"20"} />
                    <span className="ml-2">Card</span>
                  </Label>
                </div>
                <div className="w-36">
                  <RadioGroupItem
                    value={"cash"}
                    id={"cash"}
                    className="peer sr-only"
                    aria-label={"cash"}
                  />
                  <Label
                    htmlFor={"cash"}
                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Coins size={"20"} />
                    <span className="ml-2 text-md">Cash</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="fname">Comment</Label>
              <Textarea />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
