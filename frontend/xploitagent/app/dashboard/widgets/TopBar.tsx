import { Github, Search } from "lucide-react";
import Image from "next/image";

export default function TopBar() {
  return (
    <section className="  bg-[#141414] border-b-1 border-neutral-600 flex items-center">
      <div className="left w-1/5 border-r-1 border-neutral-600 px-3 py-3">
        <Image src={"/assets/logo.png"} alt="logo" width={40} height={40} />
      </div>
      <div className="right w-4/5  flex items-center">
        <div className="left w-3/4 px-3 py-3 border-r-1  border-neutral-600 flex items-center justify-between">
          <h4>Dashboard</h4>
          <div className="flex items-center">
            <Search /> Search
          </div>
        </div>
        <div className="right w-1/4 px-3 py-3">
          <Github />
        </div>
      </div>
    </section>
  );
}
