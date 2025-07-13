import SpotlightCard from "./ui/SpotlightCard";

export default function Threat() {
  return (
    <section className="w-full px-0 pt-20 text-white">
      <div className="w-full">
        <div className="flex items-center justify-center pb-10 flex-wrap w-full">
          <div className="flex flex-wrap gap-10 w-full px-10">
            <SpotlightCard
              spotlightColor="rgba(7, 151, 88, 0.8)"
              className="bg-emerald-800/20 border-2 border-neutral-50 rounded-3xl w-full lg:w-[calc(50%-1.25rem)] p-16 flex items-center justify-center "
            >
              <div>
                <h2 className="text-4xl text-center font-medium text-white pb-6">
                  <code> Threat Intelligence</code>{" "}
                </h2>
                <h2 className="text-[5rem] text-center font-bold text-neutral-400">
                  <code># 1</code>
                </h2>
              </div>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(7, 151, 88, 0.8)"
              className="bg-emerald-800/20 border-2 border-neutral-50 rounded-3xl w-full lg:w-[calc(50%-1.25rem)] p-16 flex items-center justify-center "
            >
              <div>
                <h2 className="text-4xl text-center font-medium text-white pb-6">
                  <code>Security rate</code>{" "}
                </h2>
                <h2 className="text-[5rem] text-center font-bold text-neutral-400">
                  <code>70%</code>
                </h2>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
