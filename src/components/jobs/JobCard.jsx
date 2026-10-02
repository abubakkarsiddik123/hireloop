"use client";

import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { Briefcase, Calendar, MapPin, ArrowRight } from "@gravity-ui/icons";

const formatSalary = (min, max, currency) => {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return `${fmt.format(min)} – ${fmt.format(max)}`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function JobCard({ job }) {
  const {
    _id,
    jobTitle,
    category,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    city,
    country,
    deadline,
    benefits,
    remote,
    companyName,
    companyLogo,
    status,
  } = job;

  const isActive = status === "active";

  const location = [city, country]
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="h-full w-full flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors">
      <Card.Header className="flex flex-row items-start gap-3">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt={companyName}
            className="size-12 shrink-0 rounded-lg object-cover bg-zinc-800"
          />
        ) : (
          <div className="size-12 shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center text-lg font-semibold text-zinc-300">
            {companyName?.charAt(0).toUpperCase() ?? "?"}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Card.Title className="text-base font-semibold truncate">
            {jobTitle}
          </Card.Title>
          <Card.Description className="text-sm text-zinc-400 truncate">
            {companyName}
          </Card.Description>
        </div>
        <Chip
          size="sm"
          className="shrink-0"
          color={isActive ? "success" : "default"}
          variant="soft"
        >
          {isActive ? "Active" : "Closed"}
        </Chip>
      </Card.Header>

      <Card.Content className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-2 min-h-14 content-start">
          <Chip size="sm" variant="soft">
            {category}
          </Chip>
          <Chip size="sm" variant="soft">
            {jobType}
          </Chip>
          <Chip size="sm" variant="soft" color={remote ? "accent" : "default"}>
            {remote ? "Remote" : "On-site"}
          </Chip>
        </div>

        <div className="flex flex-col gap-1.5 text-sm text-zinc-300">
          <span className="flex items-center gap-2 min-w-0">
            <MapPin width={16} height={16} className="shrink-0" />
            <span className="truncate">
              {location || (remote ? "Remote" : "Location not specified")}
            </span>
          </span>
          <span className="flex items-center gap-2 min-w-0">
            <Briefcase width={16} height={16} className="shrink-0" />
            <span className="truncate">
              {formatSalary(salaryMin, salaryMax, currency || "USD")} / year
            </span>
          </span>
          <span className="flex items-center gap-2 min-w-0">
            <Calendar width={16} height={16} className="shrink-0" />
            <span className="truncate">
              {deadline ? `Apply by ${formatDate(deadline)}` : "No deadline"}
            </span>
          </span>
        </div>

        <p className="text-xs text-zinc-500 line-clamp-2 min-h-8">{benefits}</p>
      </Card.Content>

      <Card.Footer className="mt-auto">
        <Link href={`/jobs/${_id}`} className="w-full">
          <Button fullWidth variant="primary">
            View Details
            <ArrowRight width={16} height={16} />
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
