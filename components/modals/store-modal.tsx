"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
});

const StoreModal = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
      
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast({
          description: error.response.data,
          variant: "destructive",
        });
      } else {
        toast({
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
      
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage your products and orders"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      <div>
        <div className="space-y-4 py-2 pb-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce" {...field}
                      disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button variant="outline" onClick={storeModal.onClose}
                disabled={loading}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
