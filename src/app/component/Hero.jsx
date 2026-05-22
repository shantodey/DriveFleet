import Image from "next/image";
import Link from "next/link";

import heroimg from "@/assets/hero_background.jpg";

import { GrLinkNext } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <Image src={heroimg} alt="Luxury Car" fill priority sizes="100vw" className="object-cover object-center scale-105" />
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0B0B0B] to-transparent" />
      <div className="relative z-10 flex min-h-screen items-center px-6 sm:px-10 lg:px-20">
        <div className="grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2 items-center gap-16">

          <div className="max-w-2xl pt-24 lg:pt-0">
            <p className=" mb-6 text-[12px] font-medium uppercase tracking-[0.35em] text-[#C8A96B] " > Premium Exotic Rentals</p>
            <h1 className=" text-white  text-5xl  sm:text-6xl lg:text-8xl font-black uppercase leading-[0.95] tracking-tight " > Drive <br /> Without <br />  Limits.</h1>
            <p className=" mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/65">
              Discover world-class luxury and exotic vehicles for every
              occasion. Instant booking, transparent pricing, and a
              premium driving experience tailored for Dhaka.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link  href="/explore-cars"  className="  inline-flex  items-center  gap-3  rounded-full  bg-[#C8A96B]  px-8  py-4 text-sm  font-bold  uppercase tracking-[0.15em] text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,169,107,0.45)] " >
                Explore Cars
                <GrLinkNext className="text-base" />
              </Link>

              <Link href="/addcar" className=" inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl  px-8  py-4  text-sm  font-bold  uppercase  tracking-[0.15em]  text-white  transition-all duration-300  hover:border-[#C8A96B]  hover:text-[#C8A96B]   hover:bg-white/10" >
                List Your Car
              </Link>
            </div>
          </div>


          <div className="hidden lg:flex justify-end">
            <div className="  w-[320px]  rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8  shadow-[0_8px_40px_rgba(0,0,0,0.5)] " >
              <div className="space-y-8">
                

                <div className="flex items-center gap-5">
                  <div className="  flex h-14  w-14 items-center justify-center rounded-2xl bg-[#C8A96B]/10 text-[#C8A96B] " >
                    <FaCarSide className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-white">500+</h3>
                    <p className="text-sm text-white/60"> Premium Cars</p>
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div className="flex items-center gap-5">
                  <div className=" flex  h-14 w-14 items-center justify-center rounded-2xl bg-[#C8A96B]/10  text-[#C8A96B] " >
                    <RiCustomerService2Fill className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-white"> 24/7 </h3>
                    <p className="text-sm text-white/60">
                      Concierge Support
                    </p>
                  </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div className="flex items-center gap-5">
                  <div className=" flex h-14 w-14  items-center justify-center rounded-2xl bg-[#C8A96B]/10  text-[#C8A96B]">
                    <MdSecurity className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-white">  100%</h3>
                    <p className="text-sm text-white/60">
                      Insured & Secure
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;