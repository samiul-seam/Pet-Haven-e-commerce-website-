import Categories from "../components/Home/Categories/Categories";
import Blog from "../components/Home/Blogs/Blogs";
import Carousel from "../components/Home/Carousel/Carousel";
import Discount from "../components/Home/Discount/Discount";
import WhyChooseUs from "../components/Home/Services/WhyChooseUs";
import CTASection from "../components/Home/Services/CTASection";
import ShortServiceInfo from "../components/Home/Welcome/ShortServiceInfo";
import OurServices from "../components/Home/Services/OurServices";
import PetGallary from "../components/Pets/PetGallary";
import Welcome from "../components/Home/Welcome/Welcome";

const Home = () => {
  return (
    <div className="bg-white">
      <Carousel />
      <Welcome />
      <ShortServiceInfo />
      <Discount />
      <OurServices />
      <Categories />
      <PetGallary />
      <Blog />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
};

export default Home;
