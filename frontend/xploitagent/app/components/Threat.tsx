import GlareHover from "./ui/GlareHover";
import SpotlightCard from "./ui/SpotlightCard";

export default function Threat() {
  return (
    <section className="w-full px-0 pt-20 text-white">
      <div className="w-full">
        <div className="flex items-center justify-center pb-10 flex-wrap w-full">
          <div className="flex flex-wrap gap-10 w-full px-10">
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              width="46%"
              height="400px"
              borderRadius="20px"
            >
              <div>
                <h2 className="text-4xl text-center font-bold text-white pb-6">
                  <code> Threat Intelligence</code>{" "}
                </h2>
                <h2 className="text-[5rem] text-center font-bold text-neutral-400">
                  <code>#1</code>
                </h2>
              </div>
            </GlareHover>

            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              width="46%"
              height="400px"
              borderRadius="20px"
            >
              <div>
                <h2 className="text-4xl text-center font-bold text-white pb-6">
                  <code>Security rate</code>{" "}
                </h2>
                <h2 className="text-[5rem] text-center font-bold text-neutral-400">
                  <code>70%</code>
                </h2>
              </div>
            </GlareHover>
          </div>
        </div>
      </div>
    </section>
  );
}
