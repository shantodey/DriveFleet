import AboutUsPage from "@/components/AboutUs";
import FeaturedCar from "@/components/FeaturesCar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navber from "@/components/Navber";


export default function Home() {
  return (
   <>
   <Navber/>
   <Hero/>
   <AboutUsPage/>
   <FeaturedCar/>
   <Footer/>
   </>
  );
}
