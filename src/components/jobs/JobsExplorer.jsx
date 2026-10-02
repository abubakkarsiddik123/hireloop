"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/react";
import { Magnifier, Xmark } from "@gravity-ui/icons";
import JobCard from "./JobCard";


const inputClass =
  "w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-zinc-500 transition-colors";

const initialFilters = {
  search: "",
  category: "all",
  jobType: "all",
  workMode: "all", // all | remote | onsite
  sort: "default",
};

export default function JobsExplorer({ jobs }) {
  const [filters, setFilters] = useState(initialFilters);

  const set = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  // ডেটা থেকেই অপশন বানানো হচ্ছে
  const categories = useMemo(
    () => [...new Set(jobs.map((j) => j.category).filter(Boolean))].sort(),
    [jobs],
  );
  const jobTypes = useMemo(
    () => [...new Set(jobs.map((j) => j.jobType).filter(Boolean))].sort(),
    [jobs],
  );

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    let result = jobs.filter((job) => {
      if (q) {
        const haystack = [
          job.jobTitle,
          job.companyName,
          job.category,
          job.city,
          job.country,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.category !== "all" && job.category !== filters.category)
        return false;
      if (filters.jobType !== "all" && job.jobType !== filters.jobType)
        return false;
      if (filters.workMode === "remote" && !job.remote) return false;
      if (filters.workMode === "onsite" && job.remote) return false;
      return true;
    });

    if (filters.sort === "salary-high")
      result = [...result].sort((a, b) => b.salaryMax - a.salaryMax);
    if (filters.sort === "salary-low")
      result = [...result].sort((a, b) => a.salaryMin - b.salaryMin);
    if (filters.sort === "deadline")
      result = [...result].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline),
      );

    return result;
  }, [jobs, filters]);

  const isFiltered = JSON.stringify(filters) !== JSON.stringify(initialFilters);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-xl font-semibold mb-6">
        {filtered.length} of {jobs.length} Jobs
      </h2>

      {/* Search */}
      <div className="relative mb-4">
        <Magnifier
          width={16}
          height={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          value={filters.search}
          onChange={set("search")}
          placeholder="Search by title, company, city or country..."
          className={`${inputClass} pl-9`}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 mb-8">
        <select
          value={filters.category}
          onChange={set("category")}
          className={inputClass}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filters.jobType}
          onChange={set("jobType")}
          className={inputClass}
        >
          <option value="all">All job types</option>
          {jobTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={filters.workMode}
          onChange={set("workMode")}
          className={inputClass}
        >
          <option value="all">Remote & On-site</option>
          <option value="remote">Remote only</option>
          <option value="onsite">On-site only</option>
        </select>

        <select
          value={filters.sort}
          onChange={set("sort")}
          className={inputClass}
        >
          <option value="default">Sort: Default</option>
          <option value="salary-high">Salary: High to Low</option>
          <option value="salary-low">Salary: Low to High</option>
          <option value="deadline">Deadline: Soonest</option>
        </select>

        <Button
          variant="secondary"
          isDisabled={!isFiltered}
          onPress={() => setFilters(initialFilters)}
        >
          <Xmark width={16} height={16} />
          Clear
        </Button>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-400">
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-sm mt-1">Try changing your search or filters.</p>
        </div>
      )}
    </div>
  );
}
