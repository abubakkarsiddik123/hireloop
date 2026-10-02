import { notFound } from "next/navigation";

import { getJobById } from "@/lib/api/jobs";
import JobDetails from "@/components/jobs/JobDetails";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = await getJobById(id);
  return {
    title: job ? `${job.jobTitle} at ${job.companyName}` : "Job not found",
  };
}

const page = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job || job.error) notFound();

  return <JobDetails job={job} />;
};

export default page;
