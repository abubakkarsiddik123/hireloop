"use client";

import { motion } from "framer-motion";

import {
  Magnifier,
  ChartLine,
  Briefcase,
  Bookmark,
  Rocket,
  FileText,
  Bulb,
  ChartColumn,
} from "@gravity-ui/icons";

const FeaturesSection = () => {
  const features = [
    {
      icon: Magnifier,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
    },
    {
      icon: Rocket,
      title: "One-Click Apply",
      description: "Apply to multiple job applications for an easier process!",
    },
    {
      icon: ChartLine,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
    },
    {
      icon: Briefcase,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
    },
    {
      icon: Bulb,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
    },
    {
      icon: Bookmark,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
    },
    {
      icon: ChartColumn,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="bg-[#080508] px-5 py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <span className="h-1 w-1 bg-[#8B5CF6]" />

            <span className="text-[10px] font-medium tracking-wide text-white/60">
              FEATURES JOB
            </span>

            <span className="h-1 w-1 bg-[#8B5CF6]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-md text-3xl font-medium leading-tight tracking-tight text-white"
          >
            Everything you need
            <br />
            to succeed
          </motion.h2>
        </motion.div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="flex gap-3"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08 + 0.1,
                  }}
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]"
                >
                  <Icon className="h-5 w-5 text-[#D8A4D8]" />
                </motion.div>

                {/* Content */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08 + 0.15,
                    }}
                    className="text-xs font-medium text-white"
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08 + 0.2,
                    }}
                    className="mt-1.5 max-w-[155px] text-[10px] leading-4 text-white/45"
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
