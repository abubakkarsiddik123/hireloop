"use client";

import { useState } from "react";

import {
  Button,
  Input,
  Label,
  ListBox,
  Select,
  Switch,
  TextArea,
  TextField,
} from "@heroui/react";

import { Briefcase } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { creatJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

const categories = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Product",
  "Finance",
  "Human Resources",
];

const jobTypes = ["Full-time", "Part-time", "Remote", "Contract", "Internship"];

const currencies = ["USD", "EUR", "GBP", "BDT"];

const PostJobForm = ({ company }) => {
  const [isRemote, setIsRemote] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    city: "",
    country: "",
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const handleCancel = () => {
    setFormData({
      jobTitle: "",
      category: "",
      jobType: "",
      salaryMin: "",
      salaryMax: "",
      currency: "USD",
      deadline: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
    });
  };

  if (!company) {
    return (
      <p className="text-center text-white/50">
        Please add your company first to post a job.
      </p>
    );
  }

  const isApproved = company.status === "approved";
  const plan = company.plan || "Free";
  const activeJobs = company.activeJobs ?? 0;
  const jobLimit = company.jobLimit ?? 3;
  const canPost = isApproved && activeJobs < jobLimit;

  // Handle input changes
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove field error when user starts fixing it
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Job title
    if (!formData.jobTitle?.trim()) {
      newErrors.jobTitle = "Job title is required.";
    }

    // Category
    if (!formData.category) {
      newErrors.category = "Please select a job category.";
    }

    // Job type
    if (!formData.jobType) {
      newErrors.jobType = "Please select a job type.";
    }

    // Minimum salary
    if (!formData.salaryMin) {
      newErrors.salaryMin = "Minimum salary is required.";
    }

    // Maximum salary
    if (!formData.salaryMax) {
      newErrors.salaryMax = "Maximum salary is required.";
    }

    // Salary comparison
    if (
      formData.salaryMin &&
      formData.salaryMax &&
      Number(formData.salaryMin) > Number(formData.salaryMax)
    ) {
      newErrors.salaryMax =
        "Maximum salary must be greater than minimum salary.";
    }

    // Location
    if (!isRemote) {
      if (!formData.city?.trim()) {
        newErrors.city = "City is required.";
      }

      if (!formData.country?.trim()) {
        newErrors.country = "Country is required.";
      }
    }

    // Deadline
    if (!formData.deadline) {
      newErrors.deadline = "Application deadline is required.";
    }

    // Responsibilities
    if (!formData.responsibilities?.trim()) {
      newErrors.responsibilities = "Responsibilities are required.";
    }

    // Requirements
    if (!formData.requirements?.trim()) {
      newErrors.requirements = "Requirements are required.";
    }

    // Benefits
    if (!formData.benefits?.trim()) {
      newErrors.benefits = "Benefits are required.";
    }

    // Company approval
    // if (!company.approved) {
    //   newErrors.company = "Your company must be approved before posting a job.";
    // }

    // Job limit
    if (company.activeJobs >= company.jobLimit) {
      newErrors.company = "You have reached your active job limit.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const jobData = {
      ...formData,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
      remote: isRemote,
      companyId: company._id,
      companyName: company.companyName,
      companyLogo: company.logo,
      status: "active",
    };

    const res = await creatJob(jobData);

    if (res.insertedId) {
      toast.success("Job added successfully!");
      redirect("/dashboard/recruiter/jobs");
    } else {
      toast.error("Failed to add job");
    }
  };
  // const canPost = company.approved && company.activeJobs < company.jobLimit;

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">
          Post a Job
        </h1>

        <p className="mt-2 text-sm text-white/50">
          Create a new job opening and find the right candidate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= JOB INFO ================= */}

        <section className="rounded-2xl border border-white/10 bg-[#111111] p-5 sm:p-7">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
              <Briefcase className="text-purple-400" />
            </div>

            <div>
              <h2 className="text-lg font-medium text-white">Job Info</h2>

              <p className="text-sm text-white/40">
                Basic information about the job.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Job Title */}

            <TextField name="jobTitle" isRequired validationBehavior="aria">
              <Label className="text-white">Job Title</Label>

              <Input
                placeholder="e.g. Senior Frontend Developer"
                value={formData.jobTitle}
                onChange={(event) =>
                  handleChange("jobTitle", event.target.value)
                }
                variant="secondary"
              />

              {errors.jobTitle && (
                <p className="mt-1 text-sm text-red-400">{errors.jobTitle}</p>
              )}
            </TextField>

            {/* Category + Job Type */}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Category */}

              <div>
                <Select
                  placeholder="Select category"
                  value={formData.category}
                  onChange={(value) => handleChange("category", value)}
                  validationBehavior="aria"
                >
                  <Label className="text-white">Job Category</Label>

                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      {categories.map((category) => (
                        <ListBox.Item key={category} id={category}>
                          {category}

                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {errors.category && (
                  <p className="mt-1 text-sm text-red-400">{errors.category}</p>
                )}
              </div>

              {/* Job Type */}

              <div>
                <Select
                  placeholder="Select job type"
                  value={formData.jobType}
                  onChange={(value) => handleChange("jobType", value)}
                  validationBehavior="aria"
                >
                  <Label className="text-white">Job Type</Label>

                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      {jobTypes.map((type) => (
                        <ListBox.Item key={type} id={type}>
                          {type}

                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {errors.jobType && (
                  <p className="mt-1 text-sm text-red-400">{errors.jobType}</p>
                )}
              </div>
            </div>

            {/* Salary */}

            <div>
              <p className="mb-3 text-sm font-medium text-white">
                Salary Range
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Minimum */}

                <TextField validationBehavior="aria">
                  <Label className="text-white">Minimum</Label>

                  <Input
                    type="number"
                    placeholder="50000"
                    value={formData.salaryMin}
                    onChange={(event) =>
                      handleChange("salaryMin", event.target.value)
                    }
                    variant="secondary"
                  />

                  {errors.salaryMin && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.salaryMin}
                    </p>
                  )}
                </TextField>

                {/* Maximum */}

                <TextField validationBehavior="aria">
                  <Label className="text-white">Maximum</Label>

                  <Input
                    type="number"
                    placeholder="80000"
                    value={formData.salaryMax}
                    onChange={(event) =>
                      handleChange("salaryMax", event.target.value)
                    }
                    variant="secondary"
                  />

                  {errors.salaryMax && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.salaryMax}
                    </p>
                  )}
                </TextField>

                {/* Currency */}

                <Select
                  value={formData.currency}
                  onChange={(value) => handleChange("currency", value)}
                >
                  <Label className="text-white">Currency</Label>

                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      {currencies.map((currency) => (
                        <ListBox.Item key={currency} id={currency}>
                          {currency}

                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Remote Toggle */}

            <div className="flex items-center justify-between rounded-xl border border-white/10 p-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Remote Position
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Allow candidates to work remotely.
                </p>
              </div>

              <Switch
                isSelected={isRemote}
                onChange={(value) => {
                  setIsRemote(value);

                  if (value) {
                    setErrors((prev) => ({
                      ...prev,
                      city: "",
                      country: "",
                    }));
                  }
                }}
              >
                <Switch.Content>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </div>

            {/* Location */}

            {!isRemote && (
              <div className="grid gap-5 sm:grid-cols-2">
                {/* City */}

                <TextField validationBehavior="aria">
                  <Label className="text-white">City</Label>

                  <Input
                    placeholder="Dhaka"
                    value={formData.city}
                    onChange={(event) =>
                      handleChange("city", event.target.value)
                    }
                    variant="secondary"
                  />

                  {errors.city && (
                    <p className="mt-1 text-sm text-red-400">{errors.city}</p>
                  )}
                </TextField>

                {/* Country */}

                <TextField validationBehavior="aria">
                  <Label className="text-white">Country</Label>

                  <Input
                    placeholder="Bangladesh"
                    value={formData.country}
                    onChange={(event) =>
                      handleChange("country", event.target.value)
                    }
                    variant="secondary"
                  />

                  {errors.country && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.country}
                    </p>
                  )}
                </TextField>
              </div>
            )}

            {/* Deadline */}

            <TextField validationBehavior="aria">
              <Label className="text-white">Application Deadline</Label>

              <Input
                type="date"
                value={formData.deadline}
                onChange={(event) =>
                  handleChange("deadline", event.target.value)
                }
                variant="secondary"
              />

              {errors.deadline && (
                <p className="mt-1 text-sm text-red-400">{errors.deadline}</p>
              )}
            </TextField>
          </div>
        </section>

        {/* ================= JOB DESCRIPTION ================= */}

        <section className="rounded-2xl border border-white/10 bg-[#111111] p-5 sm:p-7">
          <div className="mb-7">
            <h2 className="text-lg font-medium text-white">Job Description</h2>

            <p className="mt-1 text-sm text-white/40">
              Tell candidates about this position.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {/* Responsibilities */}

            <div>
              <Label className="mb-2 block text-sm text-white">
                Responsibilities
              </Label>

              <TextArea
                placeholder="Describe the main responsibilities of this role..."
                value={formData.responsibilities}
                onChange={(event) =>
                  handleChange("responsibilities", event.target.value)
                }
                variant="secondary"
                className="min-h-36"
              />

              {errors.responsibilities && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.responsibilities}
                </p>
              )}
            </div>

            {/* Requirements */}

            <div>
              <Label className="mb-2 block text-sm text-white">
                Requirements
              </Label>

              <TextArea
                placeholder="List the skills, experience and qualifications required..."
                value={formData.requirements}
                onChange={(event) =>
                  handleChange("requirements", event.target.value)
                }
                variant="secondary"
                className="min-h-36"
              />

              {errors.requirements && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.requirements}
                </p>
              )}
            </div>

            {/* Benefits */}

            <div>
              <Label className="mb-2 block text-sm text-white">Benefits</Label>

              <TextArea
                placeholder="Mention benefits such as insurance, flexible hours, bonuses..."
                value={formData.benefits}
                onChange={(event) =>
                  handleChange("benefits", event.target.value)
                }
                variant="secondary"
                className="min-h-36"
              />

              {errors.benefits && (
                <p className="mt-1 text-sm text-red-400">{errors.benefits}</p>
              )}
            </div>
          </div>
        </section>

        {/* ================= COMPANY ================= */}

        <section className="rounded-2xl border border-white/10 bg-[#111111] p-5 sm:p-7">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
              <Briefcase className="text-purple-400" />
            </div>

            <div>
              <h2 className="text-lg font-medium text-white">Company</h2>

              <p className="text-sm text-white/40">Your registered company.</p>
            </div>
          </div>

          {/* Company Information */}

          <div className="rounded-xl border border-white/10 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-white">{company.companyName}</p>

                <p className="mt-1 text-sm text-white/40">{plan} Plan</p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-white/40">Active Jobs</p>

                <p className="mt-1 text-lg font-semibold text-white">
                  {activeJobs} / {jobLimit}
                </p>
              </div>
            </div>
          </div>

          {/* Company Approval */}
          {!isApproved && (
            <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-sm text-yellow-400">
                Your company must be approved before you can post a job.
              </p>
            </div>
          )}

          {/* Job Limit */}
          {activeJobs >= jobLimit && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm text-red-400">
                You have reached your active job limit.
              </p>
            </div>
          )}
          <div className="flex flex-col mt-5 gap-3 sm:flex-row sm:justify-end">
            {/* Cancel */}
            <Button
              type="button"
              onPress={handleCancel}
              variant="secondary"
              className="w-full border border-white/10 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
            >
              Cancel
            </Button>
            {/* Post Job */}
            <Button
              type="submit"
              isDisabled={!canPost}
              className="w-full bg-[#7054f5] text-white sm:w-auto"
            >
              Post Job
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default PostJobForm;
