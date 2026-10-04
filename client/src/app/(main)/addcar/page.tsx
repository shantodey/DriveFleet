"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { IoCarSportOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";

import { authClient } from "@/lib/auth-client";
import { createCar } from "@/services/api";
import { AddCarFormValues, CreateCarPayload } from "@/types/car";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddCarPage = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AddCarFormValues>({
    defaultValues: {
      carName: "",
      dailyRentPrice: "",
      carType: "",
      seatCapacity: "",
      pickupLocation: "",
      imageUrl: "",
      description: "",
    },
  });

  const onSubmit = async (data: AddCarFormValues) => {
    if (!user) {
      toast.error("Please log in before adding a car.");
      return;
    }

    const carData: CreateCarPayload = {
      carName: data.carName,
      dailyRentPrice: Number(data.dailyRentPrice),
      carType: data.carType,
      seatCapacity: Number(data.seatCapacity),
      pickupLocation: data.pickupLocation,
      imageUrl: data.imageUrl,
      description: data.description,
      availabilityStatus: isAvailable ? "Available" : "Unavailable",
      ownerId: user.id,
      ownerName: user.name,
      ownerEmail: user.email,
    };

    try {
      const result = await createCar(carData);

      toast.success(result.message || "Success");
      redirect("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  if (!user) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <div className="w-full max-w-xl rounded-[32px] border border-border bg-card p-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d1b277]">
            <IoCarSportOutline size={38} />
          </div>

          <h2 className="mt-8 text-4xl font-black">Login Required</h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Please sign in before adding a new luxury car listing to your
            garage.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground lg:py-25">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[5px] text-[#8A672A] dark:text-[#b89b65]">
              Luxury Garage
            </p>

            <h1 className="mt-3 text-4xl font-black md:text-5xl">
              Add New Car Listing
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              Showcase your premium vehicle collection and start accepting
              luxury rentals.
            </p>
          </div>

          <div className="hidden h-16 w-16 items-center justify-center rounded-3xl border border-[#b89b65]/20 bg-[#b89b65]/10 text-[#8A672A] dark:text-[#d1b277] md:flex">
            <HiOutlineSparkles size={28} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-[36px] border border-border bg-card p-6 shadow-xl md:p-10"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-muted-foreground">
                Car Name
              </Label>

              <Input
                {...register("carName", { required: true })}
                placeholder="e.g. Mercedes Maybach S680"
                className="h-16 rounded-2xl border border-input bg-background px-5 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-muted-foreground">
                Daily Rent Price
              </Label>

              <Input
                {...register("dailyRentPrice", { required: true })}
                type="number"
                placeholder="e.g. 450"
                className="h-16 rounded-2xl border border-input bg-background px-5 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-muted-foreground">
                Car Type
              </Label>

              <Controller
                name="carType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-16 w-full rounded-2xl border border-input bg-background px-5 text-foreground">
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>

                    <SelectContent className="border-border bg-popover text-popover-foreground">
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                      <SelectItem value="Coupe">Coupe</SelectItem>
                      <SelectItem value="Pickup">Pickup</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-muted-foreground">
                Seat Capacity
              </Label>

              <Input
                {...register("seatCapacity", { required: true })}
                type="number"
                placeholder="e.g. 5"
                className="h-16 rounded-2xl border border-input bg-background px-5 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-muted-foreground">
                Pickup Location
              </Label>

              <Input
                {...register("pickupLocation", { required: true })}
                placeholder="e.g. Dhaka, Gulshan"
                className="h-16 rounded-2xl border border-input bg-background px-5 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-muted-foreground">
                Car Image URL
              </Label>

              <Input
                {...register("imageUrl", { required: true })}
                type="url"
                placeholder="https://i.ibb.co/your-image.jpg"
                className="h-16 rounded-2xl border border-input bg-background px-5 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-muted-foreground">
                Description
              </Label>

              <Textarea
                {...register("description", { required: true })}
                placeholder="Describe your luxury vehicle, features, comfort, rules and rental conditions..."
                className="min-h-45 rounded-3xl border border-input bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between rounded-[28px] border border-border bg-background p-6">
                <div>
                  <p className="text-xs uppercase tracking-[4px] text-muted-foreground">
                    Availability Status
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-foreground">
                    {isAvailable
                      ? "Available For Booking"
                      : "Currently Unavailable"}
                  </h3>

                  <p
                    className={`mt-2 text-sm ${
                      isAvailable ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {isAvailable
                      ? "Customers can rent this vehicle."
                      : "This vehicle is hidden from bookings."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAvailable((value) => !value)}
                  className={`relative h-8 w-16 rounded-full transition-all duration-300 ${
                    isAvailable ? "bg-[#b89b65]/40" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-card shadow transition-all duration-300 ${
                      isAvailable ? "left-9" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-16 w-full rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 text-sm font-bold uppercase tracking-[4px] text-[#8A672A] transition-all duration-300 hover:bg-[#b89b65]/20 dark:text-[#d6bb84] disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Car Listing"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCarPage;