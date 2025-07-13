import Hero from "./components/Hero";
import Chat from "./components/includes/Chat";
import Navbar from "./components/includes/Navbar";
import Supporters from "./components/Supporters";
import Threat from "./components/Threat";
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
    </main>
  );
}
