import { Briefcase, ChartBar, Magnifier, Star } from "@gravity-ui/icons";

const StatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: ChartBar,
      value: "12K",
      label: "Companies",
    },
    {
      icon: Magnifier,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: Star,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-[#080508]">
      {/* Globe Background */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-no-repeat"
        style={{
          backgroundImage: "url('/globe1.png')",
          backgroundPosition: "center -40px",
          backgroundSize: "900px auto",
        }}
      />

      {/* Text */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 pt-[250px] text-center">
        <p className="text-[24px] font-normal leading-[1.2] tracking-tight text-white/75 sm:text-[28px]">
          Assisting over <span className="text-white">15,000</span> job seekers
          <br />
          find their dream positions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="absolute inset-x-0 bottom-5 z-20 mx-auto grid max-w-[1120px] grid-cols-1 gap-3 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="h-[168px] rounded-xl border border-white/10 bg-[#160a0e]/95 p-4 backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-white" />

              <div className="mt-12">
                <h3 className="text-[38px] font-normal leading-none tracking-tight text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-[13px] text-white/70">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
