import Features from "./components/Features";
import Hero from "./components/Hero";
import Chat from "./components/includes/Chat";
import Footer from "./components/includes/Footer";
import Navbar from "./components/includes/Navbar";
import LatestNews from "./components/LatestNews";
import PainPoint from "./components/PainPoint";
import Solution from "./components/Solution";
import Supporters from "./components/Supporters";
import Threat from "./components/Threat";
import VideoSection from "./components/VideoSection";
import VidSec from "./components/VidSec";
import WhoThisIsFor from "./components/WhoThisIsFor";
import WhyChooseEyeShield from "./components/WhyChooseEyeShield";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Supporters />
      <Threat />
      <WhoThisIsFor />
      {/* <LatestNews /> */}
      {/* <VidSec /> */}
      {/*<VideoSection /> */}
      {/* <WhyChooseEyeShield /> */}
      {/* <PainPoint /> */}
      {/* <Solution /> */}
      {/* <Features /> */}
      {/* <Footer /> */}
      <Chat />
    </main>
  );
}
