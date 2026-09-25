"use client";

import { motion } from "framer-motion";

import {
  Briefcase,
  ChartBar,
  Magnifier,
  Star,
} from "@gravity-ui/icons";

const StatsSection = () => {
  const stats = [
    { icon: Briefcase, value: "50K", label: "Active Jobs" },
    { icon: ChartBar, value: "12K", label: "Companies" },
    { icon: Magnifier, value: "2M", label: "Job Seekers" },
    { icon: Star, value: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[560px] overflow-hidden bg-[#080508]"
    >
      {/* Background Earth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-x-0 top-0 h-[500px] bg-no-repeat"
        style={{
          backgroundImage: "url('/globe1.png')",
          backgroundPosition: "center -40px",
          backgroundSize: "900px auto",
        }}
      />

      {/* Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[80px] z-[1] h-[380px] w-[650px] -translate-x-1/2 rounded-full bg-[#7054f5]/10 blur-[100px]" />

      {/* Rotating Orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-[190px] z-[2] h-[230px] w-[720px] -translate-x-1/2 rounded-[50%] border border-[#8b76ff]/20"
      >
        <span className="absolute left-[10%] top-[-4px] h-2 w-2 rounded-full bg-[#8b76ff] shadow-[0_0_18px_#8b76ff]" />
      </motion.div>

      {/* Second Orbit */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-[180px] z-[2] h-[280px] w-[760px] -translate-x-1/2 rotate-[12deg] rounded-[50%] border border-white/[0.06]"
      >
        <span className="absolute right-[12%] top-[-3px] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_white]" />
      </motion.div>

      {/* Small Orbiting Dot */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-[210px] z-[3] h-[190px] w-[600px] -translate-x-1/2 rounded-[50%]"
      >
        <span className="absolute right-0 top-1/2 h-1.5 w-1.5 rounded-full bg-[#7054f5] shadow-[0_0_15px_#7054f5]" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 mx-auto max-w-3xl px-5 pt-[250px] text-center"
      >
        <p className="text-[24px] font-normal leading-[1.2] tracking-tight text-white/75 sm:text-[28px]">
          Assisting over <span className="text-white">15,000</span> job seekers
          <br />
          find their dream positions.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="absolute inset-x-0 bottom-5 z-20 mx-auto grid max-w-[1120px] grid-cols-1 gap-3 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 * index,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="h-[168px] rounded-xl border border-white/10 bg-[#160a0e]/95 p-4 backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-white" />

              <div className="mt-12">
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.15,
                  }}
                  className="text-[38px] font-normal leading-none tracking-tight text-white"
                >
                  {stat.value}
                </motion.h3>

                <p className="mt-3 text-[13px] text-white/70">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default StatsSection;