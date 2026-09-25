"use client";

import { Button } from "@heroui/react";
import { Briefcase, Magnifier, LocationArrow } from "@gravity-ui/icons";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#080508] px-4 py-16 text-white sm:px-6">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[720px] text-center">
          {/* Badge */}
          <div className="inline-flex h-[34px] items-center gap-2.5 rounded-full border border-white/[.12] bg-white/[.04] px-4 text-[11px] font-medium tracking-wide text-white/55">
            <Briefcase width={15} height={15} className="text-orange-300" />

            <strong className="font-semibold text-white/90">50,000+</strong>

            <span>NEW JOBS THIS MONTH</span>
          </div>

          {/* Heading */}
          <h1 className="mx-auto mt-5 max-w-[680px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[50px] md:text-[56px]">
            Find Your Dream Job Today
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-6 text-white/45 sm:text-[15px]">
            HireLoop connects top talent with world-class companies. Browse
            thousands of <br className="hidden sm:block" />
            curated opportunities and land your next role — faster.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 w-full max-w-[540px]">
            <div className="grid h-12 grid-cols-[1fr_1px_1fr_40px] items-center rounded-[11px] border border-white/[.12] bg-white/[.035] p-1.5 pl-4 backdrop-blur-md max-[430px]:grid-cols-[1fr_40px] max-[430px]:gap-2">
              {/* Job Search */}
              <div className="flex min-w-0 items-center gap-2.5 text-left text-[11px] text-white/45 sm:text-[12px]">
                <Magnifier
                  width={16}
                  height={16}
                  className="shrink-0 text-white/60"
                />

                <span className="truncate">Job title, skill or company</span>
              </div>

              {/* Divider */}
              <div className="mx-2 h-[20px] bg-white/[.10] max-[430px]:hidden" />

              {/* Location */}
              <div className="flex min-w-0 items-center gap-2.5 text-left text-[11px] text-white/45 sm:text-[12px] max-[430px]:hidden">
                <LocationArrow
                  width={16}
                  height={16}
                  className="shrink-0 text-white/60"
                />

                <span className="truncate">Location or Remote</span>
              </div>

              {/* Search Button */}
              <Button
                isIconOnly
                aria-label="Search"
                className="h-[36px] w-[36px] min-w-0 justify-self-end rounded-[8px] bg-[#7054f5] text-white"
              >
                <Magnifier width={17} height={17} />
              </Button>
            </div>
          </div>

          {/* Trending */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-[12px]">
            <span className="mr-1 text-white/35">Trending Position</span>

            {trendingPositions.map((position) => (
              <div
                key={position}
                className="inline-flex h-[25px] items-center rounded-full border border-white/[.08] bg-white/[.035] px-2.5 text-[10px] text-white/50"
              >
                {position}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
