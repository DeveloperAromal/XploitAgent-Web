import MainSection from "../components/MainSection";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

export default function Scan() {
  return (
    <main className="h-screen   overflow-hidden scrollbar-hide">
      <section>
        <TopBar />
      </section>
      <section className="flex h-full">
        <div className="w-1/5 border-r-1 border-neutral-600 bg-white">
          <SideBar />
        </div>
        <div className="w-full overflow-y-auto">
          <MainSection />
        </div>
      </section>
    </main>
  );
}
