import MainSection from "./widgets/MainSection";
import SideBar from "./widgets/SideBar";
import TopBar from "./widgets/TopBar";

export default function Dashboard() {
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
