"use client";

import {
  CrownDiamond,
  WeightHanging,
  Plus,
  ArrowRight,
} from "@gravity-ui/icons";

const PricingSection = () => {
  const plans = [
    {
      icon: CrownDiamond,
      name: "Starter",
      price: "$0",
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
    },
    {
      icon: WeightHanging,
      name: "Growth",
      price: "$17",
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      popular: true,
    },
    {
      icon: WeightHanging,
      name: "Premium",
      price: "$99",
      description: "Start building your insights hub:",
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
    },
  ];

  return (
    <section className="bg-[#080508] px-5 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-1 w-1 bg-[#8B5CF6]" />

            <span className="text-[10px] font-medium tracking-wide text-white/60">
              PRICING
            </span>

            <span className="h-1 w-1 bg-[#8B5CF6]" />
          </div>

          <h2 className="mx-auto max-w-xl text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Billing Toggle */}
        <div className="mx-auto mt-10 flex w-fit items-center rounded-full border border-white/10 bg-white/10 p-1">
          <button className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#171217]">
            Monthly
          </button>

          <button className="flex items-center gap-2 px-3 py-2 text-xs text-white/70">
            Yearly

            <span className="rounded-full bg-[#D91B9A] px-1.5 py-0.5 text-[9px] font-medium text-white">
              25%
            </span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <div
                key={index}
                className={`flex min-h-[305px] flex-col rounded-2xl border p-3 ${
                  plan.popular
                    ? "border-white/20 bg-[#24161b]"
                    : "border-white/10 bg-[#12090d]"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-[#E9A9E5]" />
                    </div>

                    <span className="text-base text-white">
                      {plan.name}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-medium tracking-tight text-white">
                      {plan.price}
                    </span>

                    <span className="text-[9px] text-white/70">
                      /month
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-7">
                  <p className="text-xs text-white">
                    {plan.description}
                  </p>

                  <div className="mt-3 space-y-2.5">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-white/10">
                          <Plus className="h-3 w-3 text-white/80" />
                        </span>

                        <span className="text-[11px] text-white/55">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  className={`mt-auto flex h-10 items-center justify-between rounded-lg px-4 text-xs font-medium ${
                    plan.popular
                      ? "bg-white text-[#171217]"
                      : "bg-white/15 text-white"
                  }`}
                >
                  <span>Choose This Plan</span>

                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;