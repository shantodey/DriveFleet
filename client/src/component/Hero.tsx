import Image from "next/image";
import Link from "next/link";
import heroimg from "@/assets/hero_background.jpg";
import { Car, Headset, MoveUpRight, ShieldCheck } from "lucide-react";

const STATS = [
  {  icon: Car,  value: "500+",  label: "Premium Cars",},
  {  icon: Headset,  value: "24/7",  label: "Concierge Support",},
  {  icon: ShieldCheck,  value: "100%",  label: "Insured & Secure",},
];

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      <Image  src={heroimg}  alt="Luxury Car"  fill  priority  sizes="100vw"  className="object-cover object-center scale-105"/>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50 dark:from-black dark:via-black/70 dark:to-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent dark:from-[#0B0B0B]" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center px-6 sm:px-10 lg:px-20">
        <div className="container mx-auto">
          <div className="grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2 items-center gap-16">
            
            {/* Left Content */}
            <div className="max-w-2xl pt-24 lg:pt-0">
              <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.35em] text-[#8A672A] dark:text-[#C8A96B]">
                Premium Exotic Rentals
              </p>
              
              <h1 className="text-foreground text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.95] tracking-tight">
                Drive <br /> Without <br /> Limits.
              </h1>
              
              <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-foreground/70">
                Discover world-class luxury and exotic vehicles for every
                occasion. Instant booking, transparent pricing, and a premium
                driving experience tailored for Dhaka.
              </p>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/explore-cars"
                  className="inline-flex items-center gap-3 rounded-full bg-[#C8A96B] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(200,169,107,0.45)]"
                >
                  Explore Cars
                  <MoveUpRight className="text-base" />
                </Link>
                
                <Link
                  href="/addcar"
                  className="inline-flex items-center gap-3 rounded-full border border-border bg-card/60 backdrop-blur-xl px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-foreground transition-all duration-300 hover:border-[#C8A96B] hover:text-[#8A672A] dark:hover:text-[#C8A96B] hover:bg-card"
                >
                  List Your Car
                </Link>
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="hidden lg:flex justify-end">
              <div className="w-[320px] rounded-3xl border border-border bg-card/80 backdrop-blur-2xl p-8 shadow-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <div className="space-y-8">
                  {STATS.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx}>
                        <div className="flex items-center gap-5">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8A96B]/10 text-[#8A672A] dark:text-[#C8A96B]">
                            <Icon className="text-2xl" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-foreground">
                              {stat.value}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                        {idx !== STATS.length - 1 && (
                          <div className="mt-8 h-px w-full bg-border" />
                        )}
                      </div>
                    );
                  })}
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