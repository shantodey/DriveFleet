import AboutUsPage from "@/component/AboutUs";
import FeaturedCar from "@/component/FeaturesCar";
import Footer from "@/component/Footer";
import Hero from "@/component/Hero";
import Navber from "@/component/Navber";


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
