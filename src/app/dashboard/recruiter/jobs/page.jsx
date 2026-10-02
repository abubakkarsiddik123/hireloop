import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJob } from "@/lib/api/jobs";
import { Table, Button } from "@heroui/react";

const RecruiterJobs = async () => {
  const company =await getLoggedInRecruiterCompany();
  console.log(company, "company from recruiter jobs");
  console.log(company._id, "recruiter jobs");

  const jobs = await getCompanyJob(company._id);
  // console.log(jobs, "recruiter jobs page");

  // console.log(jobs, "company jobs");

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Recruiter / Company All Jobs
      </h2>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Job listings" className="min-w-[1100px]">
            <Table.Header>
              <Table.Column isRowHeader>Job Title</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Job Type</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Salary</Table.Column>
              <Table.Column>Deadline</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs.map((job) => (
                <Table.Row key={job._id}>
                  <Table.Cell>{job.jobTitle}</Table.Cell>

                  <Table.Cell>{job.category}</Table.Cell>

                  <Table.Cell>{job.jobType}</Table.Cell>

                  <Table.Cell>
                    {job.jobType === "Remote"
                      ? "Remote"
                      : `${job.city}, ${job.country}`}
                  </Table.Cell>

                  <Table.Cell>
                    {job.currency} {job.salaryMin} - {job.salaryMax}
                  </Table.Cell>

                  <Table.Cell>{job.deadline}</Table.Cell>

                  <Table.Cell>
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm capitalize text-green-500">
                      {job.status}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="flat">
                        View
                      </Button>

                      <Button size="sm" variant="flat">
                        Edit
                      </Button>

                      <Button size="sm" color="danger" variant="flat">
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default RecruiterJobs;
