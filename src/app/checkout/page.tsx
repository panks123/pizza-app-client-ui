import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Coins, CreditCard, PlusIcon } from "lucide-react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout: React.FC<{searchParams: { tenantId : string}}> = async ({searchParams}) => {
  const qs = new URLSearchParams(searchParams).toString();
  const session = await getSession();
  if (!session) {
    redirect(`/login?${qs}`);
  }
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
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                className="w-full"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                className="w-full"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Address</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size={"sm"} variant={"link"}>
                        <PlusIcon size={16} />
                        <span className="ml-2">Add New Address</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Address</DialogTitle>
                        <DialogDescription>
                          We can save your address for future orders.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Textarea className="mt-2" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <RadioGroup
                  defaultValue="option-one"
                  className="grid grid-cols-2 gap-6 mt-2"
                >
                  <Card className="p-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one" className="leading-normal">
                        123, Abc Street, New York, NY 10001 United States
                      </Label>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two" className="leading-normal">
                        Flat No. 11, Sunshine Avenue, Mumbai, Andheri East
                        Mumbai Maharashtra, India - 110011
                      </Label>
                    </div>
                  </Card>
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

export default Checkout;
