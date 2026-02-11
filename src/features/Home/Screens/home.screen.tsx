import DealsBanner from "../Components/DealsBanner";
import FeaturedProducts from "../Components/FeaturedProducts";
import OurCategories from "../Components/OurCategories";
import Slider from "../Components/Slider";
import PromoBanner from "../Components/promoBanner"
import Newsletter from "../Components/Newletter";

export default function HomeScreen() {
  return <>
  <Slider/>
  <PromoBanner/>
  <OurCategories/>
  <DealsBanner/>
  <FeaturedProducts/>
  <Newsletter/>
  </>
}

