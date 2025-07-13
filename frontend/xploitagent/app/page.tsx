import AboutProduct from "./components/AboutProduct";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Chat from "./components/includes/Chat";
import Navbar from "./components/includes/Navbar";
import Supporters from "./components/Supporters";
import Threat from "./components/Threat";
import WhatMakesItUnique from "./components/WhatMakesItUnique";
import WhatWeDo from "./components/WhatWeDo";
import WhoThisIsFor from "./components/WhoThisIsFor";

export default function Home() {
  return (
    <main className="">
      <Chat />
      <Navbar />
      <Hero />
      <Supporters />
      <Threat />
      <WhoThisIsFor />
      <WhatMakesItUnique />
      <WhatWeDo />
      <AboutProduct />
      <Footer />
    </main>
  );
}
