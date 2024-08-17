'use client';
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "@/lib/http/api";

const AddAddress: React.FC<{customerId: string}> = ({customerId}) => {
  const [open, setOpen] = useState(false);
  const FormSchema = z.object({
    address: z
      .string()
      .min(2, { message: "Address must be at least 2 characters long" }),
  });
  const addAddressForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const queryClient = useQueryClient();

  const {mutate, isPending, isError} = useMutation({
    mutationKey: ['add-address', customerId],
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const payload = data;
      return await addAddress(customerId, payload).then(res => res.data);
    },
    onSuccess: () => {
      addAddressForm.reset();
      setOpen(false);
      return queryClient.invalidateQueries({queryKey: ['customer']});
    }
  })

  const handleSubmit = (data: z.infer<typeof FormSchema>) => { 
    mutate(data);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"link"}>
          <PlusIcon size={16} />
          <span className="ml-2">Add New Address</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...addAddressForm}>
          <form onSubmit={addAddressForm.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                We can save your address for future orders.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <FormField 
                    name="address" 
                    control={addAddressForm.control}
                    render={({ field }) => <FormItem>
                        <FormControl>
                            <Textarea className="mt-2" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
               {
                isPending ? 
                <span className="flex items-center space-x-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  <span>Saving...</span>
                </span> : 
                <span>Save Changes</span>
               }
              </Button>
            </DialogFooter>
            {isError && <p className="text-red-600"><span className="font-bold">Error:</span> Could not add address.</p>}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
