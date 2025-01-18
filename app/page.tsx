import Hero from '../components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from "@/components/HomeProperties";
import connectDb from "@/config/database";

const HomePage = () => {

  connectDb();

  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};
export default HomePage;
