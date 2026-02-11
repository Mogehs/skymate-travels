import React from "react";

const Achievements = () => {
  const stats = [
    {
      value: "2,400+",
      label: "Flights Curated",
    },
    {
      value: "42+",
      label: "Partner Airlines",
    },
    {
      value: "68",
      label: "Cities Connected",
    },
    {
      value: "24/7",
      label: "Support Access",
    },
  ];

  return (
    <section className="px-6 pb-16 lg:px-20 bg-white font-dm">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl lg:text-4xl font-bold text-slate-900 font-sansita mb-2">
                {item.value}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-slate-500">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
