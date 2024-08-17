"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, CreditCard, LoaderCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/lib/http/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Customer } from "@/types";
import AddAddress from "./add-address";
import { Button } from "@/components/ui/button";

const CustomerForm = () => {
  const FormSchema = z.object({
    address: z.string({ required_error: "Please select an address" }),
    paymentMode: z.enum(["card", "cash"], {
      required_error: "Please select a payment mode",
    }),
    comment: z.any(),
  });
  const customerForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { data: customer, isLoading } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Data::", data);
  };

  if (isLoading)
    return (
      <div className="flex container gap-6 mt-16">
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
    );
  return (
    <Form {...customerForm}>
      <form onSubmit={customerForm.handleSubmit(handleSubmit)}>
        <div className="flex container gap-6 mt-16 pb-8">
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
                      {customer && <AddAddress customerId={customer._id} />}
                    </div>
                    <FormField
                      name="address"
                      control={customerForm.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-6 mt-2"
                              >
                                {customer?.addresses.map((address) => (
                                  <Card key={address.text} className="p-6">
                                    <div className="flex items-center space-x-2">
                                      <FormControl>
                                        <RadioGroupItem
                                          value={address.text}
                                          id={address.text}
                                        />
                                      </FormControl>
                                      <Label
                                        htmlFor={address.text}
                                        className="leading-normal cursor-pointer"
                                      >
                                        {address.text}
                                      </Label>
                                    </div>
                                  </Card>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label>Payment Mode</Label>
                  <FormField
                    name="paymentMode"
                    control={customerForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              className="flex gap-6"
                              onValueChange={field.onChange}
                            >
                              <div className="w-36">
                                <FormControl>
                                  <RadioGroupItem
                                    value="card"
                                    id="card"
                                    className="peer sr-only"
                                    aria-label="card"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor={"card"}
                                  className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <CreditCard size={"20"} />
                                  <span className="ml-2">Card</span>
                                </Label>
                              </div>
                              <div className="w-36">
                                <FormControl>
                                  <RadioGroupItem
                                    value={"cash"}
                                    id={"cash"}
                                    className="peer sr-only"
                                    aria-label={"cash"}
                                  />
                                </FormControl>
                                <Label
                                  htmlFor={"cash"}
                                  className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <Coins size={"20"} />
                                  <span className="ml-2 text-md">Cash</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="fname">Comment</Label>
                  <FormField
                    name="comment"
                    control={customerForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Textarea className="mt-2" {...field} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-2/5 border-none h-auto self-start">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardContent className="grid gap-4 pt-6">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{900}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Taxes</span>
                  <span className="font-bold">₹{10}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery charges</span>
                  <span className="font-bold">₹{50}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <span className="font-bold">₹{20}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <span className="font-bold">Order total</span>
                  <span className="font-bold flex flex-col items-end">
                    <span
                      className={
                        // discountPercentage ? "line-through text-gray-400" : ""
                        "line-through text-gray-400"
                      }
                    >
                      ₹{950}
                    </span>
                    {/* {discountPercentage ? ( */}
                    {true ? (
                      <span className="text-green-700">
                        ₹{890}
                      </span>
                    ) : null}
                  </span>
                </div>
                {/* {discountError && <div className="text-red-500">{discountError}</div>} */}
                {false && <div className="text-red-500">{"Error"}</div>}
                <div className="flex items-center gap-4">
                    <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="w-full"
                        placeholder="Coupon code"
                        // ref={couponCodeRef}
                    />
                    {/* todo: add loading */}
                    {/* <Button onClick={handleCouponValidation} variant={'outline'}> */}
                    <Button variant={'outline'}>
                        Apply
                    </Button>
                </div>

                <div className="text-right mt-6">
                    {/* <Button disabled={isPlaceOrderPending}> */}
                    <Button disabled={false}>
                        {/* {isPlaceOrderPending ? ( */}
                        {false ? (
                            <span className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                <span>Please wait...</span>
                            </span>
                        ) : (
                            <span>Place order</span>
                        )}
                    </Button>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default CustomerForm;
