import Image from "next/image";
import heroimg from"@/assets/hero_background.jpg"
import Link from "next/link";
const Hero = () => {
  return (
    <section className="relative h-[92vh] w-full overflow-hidden">
      <Image src={heroimg} alt="Luxury car on an open road" fill priority sizes="100vw" className="object-cover object-center"/>
      <div className="absolute inset-0 bg-gradient-to-t  from-black/80 via-black/50 to-black/20" />

      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Premium Car Rentals</p>
          <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Drive the Car <br /><span className="text-primary">You Deserve.</span>
          </h1>

          <p className="mb-10 max-w-lg text-base font-normal leading-relaxed text-white/70 sm:text-lg">
            Browse hundreds of premium and exotic vehicles available for rent.
            Transparent pricing, instant booking, no hidden fees.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 hover:shadow-primary/50"
            >
              Explore Cars
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/add-car"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              List Your Car
            </Link>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

    </section>
  );
};

export default Hero;