// app/jobs/page.jsx

import JobsExplorer from "@/components/jobs/JobsExplorer";
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
  const jobs = await getJobs();

  return <JobsExplorer jobs={jobs} />;
}
