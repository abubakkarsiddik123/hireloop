"use client";
import { Briefcase, Persons, ChartBar, Magnifier } from "@gravity-ui/icons";

import { useSession } from "@/lib/auth-client";
import React from "react";
import StatCard from "@/components/dashboard/StatCard";

const RecruiterDashboardHomepage = () => {
  const recruiterStats = [
    {
      id: 1,
      label: "Active Jobs",
      value: "24",
      icon: Briefcase,
    },
    {
      id: 2,
      label: "Candidates",
      value: "1.2K",
      icon: Persons,
    },
    {
      id: 3,
      label: "Applications",
      value: "356",
      icon: ChartBar,
    },
    {
      id: 4,
      label: "Job Views",
      value: "8.5K",
      icon: Magnifier,
    },
  ];
  const { data: session, isPending } = useSession();
  if (isPending) {
    return<h2>loding....</h2>;
  }
  const user = session?.user;
  return (
    <div>
      <h2 className="lg:text-3xl text-xl ">WllCome Back, {user?.name}</h2>
      <StatCard stats={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardHomepage;
