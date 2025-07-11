import SideBar from "../../../widgets/SideBar";
import TopBar from "../../../widgets/TopBar";
import LogPage from "../../../screens/LogPage";

export default function Checking() {
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
          <LogPage />
        </div>
      </section>
    </main>
  );
}
