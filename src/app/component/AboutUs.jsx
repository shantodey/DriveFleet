import { FaShieldAlt, FaCarSide, FaCrown } from "react-icons/fa";

const AboutUsPage = () => {
  const cardData = [
    {
      icon: <FaCrown />,
      title: "Private Chauffeur Experience",
      description:
        "From airport arrivals to exclusive city rides, every booking is tailored around your lifestyle with premium concierge-level service.",
    },

    {
      icon: <FaCarSide />,
      title: "Handpicked Exotic Fleet",
      description:
        "Explore a refined collection of luxury sedans, exotic supercars, and elite SUVs maintained to perfection before every journey.",
    },

    {
      icon: <FaShieldAlt />,
      title: "Transparent Luxury Pricing",
      description:
        "No hidden charges. No unexpected fees. Every rental includes clear pricing, trusted protection, and a seamless booking experience.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] py-28 px-6">
      <div className="absolute left-1/2 top-0 h-125 w-215 -translate-x-1/2 rounded-full bg-[#C8A96B]/10 blur-[140px]" />
      <div className="relative container mx-auto max-w-7xl">

        <div className="mb-20 max-w-3xl">
          <p className="  mb-5  text-[12px]  uppercase  tracking-[0.35em]  text-[#C8A96B]  font-medium">
            Luxury Experience
          </p>

          <h1 className=" text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white" >
            Exotic Car Rental <br />
            Experience In Dhaka
          </h1>
          <p className=" mt-8 max-w-2xl text-base sm:text-lg  leading-relaxed text-white/60">
            Designed for drivers who demand more than transportation.
            Experience elite comfort, curated vehicles, and luxury
            service crafted around every journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className=" group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/3 p-10 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A96B]/40 lg:col-span-2">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C8A96B]/10 blur-[120px]" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className=" mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C8A96B]/10 text-3xl text-[#C8A96B] ">
                  {cardData[0].icon}
                </div>
                <h2 className=" max-w-xl text-3xl sm:text-4xl font-black leading-tight text-white" >
                  {cardData[0].title}
                </h2>

                <p className=" mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
                  {cardData[0].description}
                </p>
              </div>

              <div className="mt-14 flex items-center gap-10">
                <div>
                  <h3 className="text-4xl font-black text-[#C8A96B]">
                    24/7
                  </h3>

                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/40">
                    Concierge
                  </p>
                </div>

                <div className="h-12 w-px bg-white/10" />

                <div>
                  <h3 className="text-4xl font-black text-[#C8A96B]">
                    500+
                  </h3>

                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/40">
                    Luxury Cars
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-6">
            {cardData.slice(1).map((item, index) => (
              <div key={index}  className="  group  relative  overflow-hidden  rounded-[28px]  border  border-white/10  bg-white/3  p-8  backdrop-blur-2xl  transition-all  duration-500  hover:-translate-y-2  hover:border-[#C8A96B]/40  hover:bg-white/5 ">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#C8A96B]/5 blur-[90px]" />
                <div className="relative z-10">
                  <div className=" mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8A96B]/10 text-2xl text-[#C8A96B] ">
                    {item.icon}
                  </div>

                  <h3 className=" text-2xl font-bold leading-tight text-white " >
                    {item.title}
                  </h3>

                  <p  className="  mt-4  text-base  leading-relaxed   text-white/55 " >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;