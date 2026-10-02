import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { ArrowLeft, Briefcase, Calendar, MapPin } from "@gravity-ui/icons";

const formatSalary = (min, max, currency) => {
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  });
  return `${fmt.format(min)} – ${fmt.format(max)}`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// "A, B, C" -> ["A", "B", "C"]
const splitByComma = (text) =>
  (text || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// "Sentence one. Sentence two." -> ["Sentence one.", "Sentence two."]
const splitBySentence = (text) =>
  (text || "")
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

function Section({ title, items }) {
  if (!items.length) return null;
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-sm leading-relaxed">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon width={18} height={18} className="mt-0.5 shrink-0 text-zinc-500" />
      <div className="min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-sm text-zinc-200 wrap-break-word">{value}</p>
      </div>
    </div>
  );
}

export default function JobDetails({ job }) {
  const {
    jobTitle,
    category,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    city,
    country,
    deadline,
    responsibilities,
    requirements,
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
  const hasSalary = Number(salaryMin) > 0 && Number(salaryMax) > 0;
  const isExpired = deadline && new Date(deadline) < new Date();
  const canApply = isActive && !isExpired;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 mb-6"
      >
        <ArrowLeft width={16} height={16} />
        Back to jobs
      </Link>

      {/* Header */}
      <Card className="bg-zinc-900 border border-zinc-800 mb-6">
        <Card.Content className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className="size-16 shrink-0 rounded-xl object-cover bg-zinc-800"
            />
          ) : (
            <div className="size-16 shrink-0 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl font-semibold text-zinc-300">
              {companyName?.charAt(0).toUpperCase() ?? "?"}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold wrap-break-word">{jobTitle}</h1>
            <p className="text-zinc-400">{companyName}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Chip size="sm" variant="soft">
                {category}
              </Chip>
              <Chip size="sm" variant="soft">
                {jobType}
              </Chip>
              <Chip
                size="sm"
                variant="soft"
                color={remote ? "accent" : "default"}
              >
                {remote ? "Remote" : "On-site"}
              </Chip>
              <Chip
                size="sm"
                variant="soft"
                color={canApply ? "success" : "default"}
              >
                {canApply ? "Active" : isExpired ? "Expired" : "Closed"}
              </Chip>
            </div>
          </div>

          <Button
            variant="primary"
            isDisabled={!canApply}
            className="sm:self-start"
          >
            {canApply ? "Apply Now" : "Applications Closed"}
          </Button>
        </Card.Content>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Card className="bg-zinc-900 border border-zinc-800">
            <Card.Content className="flex flex-col gap-8">
              <Section
                title="Responsibilities"
                items={splitBySentence(responsibilities)}
              />
              <Section
                title="Requirements"
                items={splitBySentence(requirements)}
              />

              {splitByComma(benefits).length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {splitByComma(benefits).map((b) => (
                      <Chip key={b} size="sm" variant="soft" color="success">
                        {b}
                      </Chip>
                    ))}
                  </div>
                </section>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <aside>
          <Card className="bg-zinc-900 border border-zinc-800 lg:sticky lg:top-6">
            <Card.Header>
              <Card.Title className="text-base">Job Overview</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col gap-5">
              <InfoRow
                icon={MapPin}
                label="Location"
                value={location || (remote ? "Remote" : "")}
              />
              <InfoRow
                icon={Briefcase}
                label="Salary"
                value={
                  hasSalary
                    ? `${formatSalary(salaryMin, salaryMax, currency)} / year`
                    : ""
                }
              />
              <InfoRow icon={Briefcase} label="Job type" value={jobType} />
              <InfoRow
                icon={Calendar}
                label="Application deadline"
                value={deadline ? formatDate(deadline) : ""}
              />
            </Card.Content>
          </Card>
        </aside>
      </div>
    </div>
  );
}
