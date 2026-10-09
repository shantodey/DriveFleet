"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { CalendarDays, MailOpen, Sparkles, Users } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { createBooking } from "@/services/api";
import { BookCarCardProps, BookingFormValues, BookingPayload } from "@/types/booking";
import { Dialog, DialogContent, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";

const BookCarCard: React.FC<BookCarCardProps> = ({ car }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<BookingFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      driverNeeded: "no",
      startDate: null,
      endDate: null,
      message: "",
    },
  });

  const driverOption = watch("driverNeeded");

  if (!user) return null;

  const { _id, carName, imageUrl, seatCapacity } = car;

  const onSubmit = async (data: BookingFormValues) => {
    const bookingData: BookingPayload = {
      userId: user.id,
      userName: data.name,
      userEmail: data.email,
      carImg: imageUrl,
      carId: _id,
      carName,
      people: Number(seatCapacity ?? 0),
      phone: data.phone,
      message: data.message,
      driverNeeded: data.driverNeeded,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    try {
      await createBooking(bookingData);
      toast.success("Booking Successful");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const datePicker = (
    value: string | null,
    onChange: (value: string | null) => void,
  ) => (
    <Popover>
      <PopoverTrigger render={
        <Button type="button" variant="outline" className="h-15 w-full justify-start rounded-2xl border border-border bg-background px-5 text-left font-normal text-foreground hover:bg-muted hover:text-foreground" >
          {value || "Select date"}
        </Button>}>
      </PopoverTrigger>

      <PopoverContent className="w-auto border-border bg-popover p-0">
        <Calendar mode="single" selected={value ? new Date(value) : undefined}
          onSelect={(date) =>
            onChange(date ? date.toISOString().split("T")[0] : null)
          }
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <Dialog>
      <DialogTrigger render={
        <Button className="h-15 w-full rounded-2xl border border-[#b89b65]/30 bg-[#b89b65] px-6 text-sm font-black uppercase tracking-[3px] text-black transition-all duration-300 hover:scale-[1.01] hover:bg-[#d2b578] active:scale-[0.99]">
          Book This Vehicle
        </Button>}>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[34px] border border-border bg-card p-0 text-foreground shadow-xl sm:max-w-3xl">
        <div className="border-b border-border px-7 py-7 md:px-9">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-[#b89b65]/20 bg-[#b89b65]/10 text-[#8A672A] dark:text-[#d6bb84]">
                <MailOpen size={28} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[5px] text-[#8A672A] dark:text-[#b89b65]">
                  Luxury Reservation
                </p>
                <h2 className="mt-2 text-3xl font-black text-foreground">
                  Book {carName}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  Complete your reservation details and confirm your premium vehicle booking.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="rounded-[30px] border border-border bg-background p-5 md:p-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label className="mb-3 block text-xs uppercase tracking-[4px] text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    {...register("name", { required: true })}
                    placeholder="Enter your name"
                    className="h-15 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <Label className="mb-3 block text-xs uppercase tracking-[4px] text-muted-foreground">
                    Email Address
                  </Label>
                  <Input
                    {...register("email", { required: true })}
                    placeholder="Enter your email"
                    className="h-15 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-3 block text-xs uppercase tracking-[4px] text-muted-foreground">
                    Phone Number
                  </Label>
                  <Input
                    {...register("phone", { required: true })}
                    placeholder="Enter your phone number"
                    className="h-15 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-[28px] border border-border bg-card p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/3 text-[#d6bb84]">
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-muted-foreground">
                        Rental Start
                      </p>
                      <h3 className="mt-1 text-base font-bold text-foreground">
                        Start Date
                      </h3>
                    </div>
                  </div>

                  <Controller
                    control={control}
                    name="startDate"
                    rules={{ required: true }}
                    render={({ field }) =>
                      datePicker(field.value, field.onChange)
                    }
                  />
                </div>

                <div className="rounded-[28px] border border-border bg-card p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/3 text-[#d6bb84]">
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-muted-foreground">
                        Rental Return
                      </p>
                      <h3 className="mt-1 text-base font-bold text-foreground">
                        End Date
                      </h3>
                    </div>
                  </div>

                  <Controller control={control} name="endDate" rules={{ required: true }} render={({ field }) => datePicker(field.value, field.onChange)} />
                </div>
              </div>

              <div className="rounded-[28px] border border-border bg-card p-6">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-[#8A672A] dark:text-[#d6bb84]">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-muted-foreground">
                        Driver Service
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-foreground">
                        Need A Professional Driver?
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Select whether you want a personal chauffeur during your trip.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {["yes", "no"].map((option) => (
                      <label key={option} className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 transition-all duration-300 
                        ${driverOption === option
                          ? "border-[#b89b65]/20 bg-[#b89b65]/10 text-[#d6bb84]"
                          : "border-border bg-background text-foreground"
                        }`}>
                        <input type="radio" value={option} {...register("driverNeeded")} className="hidden" />
                        <div className={`h-4 w-4 rounded-full border ${driverOption === option
                          ? "border-[#d6bb84] bg-[#d6bb84]"
                          : "border-gray-500"
                          }`} />
                        <span className="text-sm font-bold uppercase tracking-[2px]">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-3 block text-xs uppercase tracking-[4px] text-muted-foreground">
                  Additional Message
                </Label>
                <Textarea
                  {...register("message")}
                  placeholder="Special requests, pickup instructions or luxury preferences..."
                  className="min-h-35 rounded-3xl border border-input bg-card px-5 py-4 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:justify-end">
                <DialogClose render={
                  <Button type="button" variant="outline" className="h-14 rounded-2xl border border-border bg-background px-7 text-xs font-bold uppercase tracking-[3px] text-foreground hover:bg-muted hover:text-foreground">
                    Cancel
                  </Button>
                }>
                </DialogClose>

                <Button type="submit" disabled={isSubmitting} className="h-14 rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 px-8 text-xs font-bold uppercase tracking-[3px] text-[#8A672A] hover:bg-[#b89b65]/20 dark:text-[#d6bb84] disabled:opacity-50">
                  <Sparkles size={18} />
                  <span>
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookCarCard;