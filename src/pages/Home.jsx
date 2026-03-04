import Categories from "../components/Home/Categories/Categories";
import Blog from "../components/Home/Blogs/Blogs";
import Carousel from "../components/Home/Carousel/Carousel";
import Discount from "../components/Home/Discount/Discount";
import FreePets from "../components/Home/Pets/FreePets";
import PaidPet from "../components/Home/Pets/PaidPets";
import WhyChooseUs from "../components/Home/WhyChooseUs/WhyChooseUs";
import CTASection from "../components/Home/WhyChooseUs/CTASection";

const Home = () => {
  return (
    <div className="bg-cyan-100">
      <Carousel />
      <Categories />
      <Discount />
      <FreePets />
      <PaidPet />
      <Blog />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
};

export default Home;
