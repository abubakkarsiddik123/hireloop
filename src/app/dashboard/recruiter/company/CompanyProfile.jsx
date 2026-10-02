"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FolderArrowUpIn, MapPin } from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Other",
];

const EMPLOYEE_RANGES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const fieldClass =
  "w-full rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-gray-400";

const STATUS_STYLES = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

/* ------------------------------------------------------------------ */
/* Company Form (Add + Edit )                                */
/* ------------------------------------------------------------------ */
const CompanyForm = ({ initialData, onSubmit, onCancel }) => {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    companyName: initialData?.companyName || "",
    industry: initialData?.industry || "Technology",
    website: (initialData?.website || "").replace(/^https?:\/\//, ""),
    location: initialData?.location || "",
    employeeRange: initialData?.employeeRange || "1-10 employees",
    logo: initialData?.logo || "",
    description: initialData?.description || "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload -> Cloudinary -> public URL
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setUploadError("Only PNG or JPG allowed");
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadError("Image must be 5MB or less");
      return;
    }

    try {
      setUploading(true);
      const body = new FormData();
      body.append("file", file);
      body.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body },
      );
      const data = await res.json();
      if (!data.secure_url) {
        // console.log(data, "cloudinary error");
        throw new Error(data.error?.message || "Upload failed");
      }

      setForm((prev) => ({ ...prev, logo: data.secure_url }));
    } catch (err) {
      setUploadError("Image upload failed, try again");
    } finally {
      setUploading(false);
    }
    //     console.log(
    //   process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    //   process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    //   "cloudinary cloud"
    // );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      website: form.website ? `https://${form.website}` : "",
    };

    try {
      // console.log(payload, "company details");
      setSubmitting(true);
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
      <form
        onSubmit={handleSubmit}
        className="my-auto w-full max-w-2xl rounded-2xl border border-[#2a2a2a] bg-[#161616]"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#2a2a2a] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Company" : "Register New Company"}
            </h2>
            <p className="text-xs text-gray-400">
              Enter your business details to start hiring on HireLoop.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-xl leading-none text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 px-6 py-6 sm:grid-cols-2">
          {/* Company Name */}
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium">
              Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              required
              value={form.companyName}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              className={fieldClass}
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <label htmlFor="industry" className="text-sm font-medium">
              Industry / Category
            </label>
            <select
              id="industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className={fieldClass}
            >
              {INDUSTRIES.map((item) => (
                <option key={item} value={item} className="bg-[#1c1c1c]">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label htmlFor="website" className="text-sm font-medium">
              Website URL
            </label>
            <div className="flex overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] focus-within:border-gray-400">
              <span className="flex items-center bg-[#262626] px-3 text-sm text-gray-300">
                https://
              </span>
              <input
                id="website"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="www.company.com"
                className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] px-3 focus-within:border-gray-400">
              <MapPin className="size-4 shrink-0 text-gray-400" />
              <input
                id="location"
                name="location"
                required
                value={form.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full bg-transparent py-3 text-sm text-white placeholder:text-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Employee Count Range */}
          <div className="space-y-2">
            <label htmlFor="employeeRange" className="text-sm font-medium">
              Employee Count Range
            </label>
            <select
              id="employeeRange"
              name="employeeRange"
              value={form.employeeRange}
              onChange={handleChange}
              className={fieldClass}
            >
              {EMPLOYEE_RANGES.map((item) => (
                <option key={item} value={item} className="bg-[#1c1c1c]">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Company Logo */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Company Logo</p>
            <div className="flex items-center gap-4">
              <label className="flex size-14 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#404040] bg-[#1c1c1c] hover:border-gray-400">
                {form.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.logo}
                    alt="Company logo"
                    className="size-full object-cover"
                  />
                ) : (
                  <FolderArrowUpIn className="size-5 text-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>

              <div>
                <p className="text-xs font-medium">
                  {uploading
                    ? "Uploading..."
                    : form.logo
                      ? "Logo uploaded"
                      : "Upload image"}
                </p>
                <p className="text-[10px] text-gray-500">PNG, JPG up to 5MB</p>
                {uploadError && (
                  <p className="text-[10px] text-red-400">{uploadError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="description" className="text-sm font-medium">
              Brief Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us about your company's mission and culture..."
              className={`${fieldClass} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#2a2a2a] px-6 py-5">
          <Button type="button" variant="outline" onPress={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isDisabled={uploading || submitting}>
            {submitting
              ? "Saving..."
              : isEdit
                ? "Save Changes"
                : "Register Company"}
          </Button>
        </div>
      </form>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */
const CompanyProfile = ({ recruiter, recruiterCompany }) => {
  // null = কোনো কোম্পানি add করা নেই
  // TODO: page load হলে API থেকে recruiter-এর company fetch করে এখানে set করুন
  const [company, setCompany] = useState(
    recruiterCompany?._id ? recruiterCompany : null,
  );
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (payload) => {
    if (company) {
      setCompany((prev) => ({ ...prev, ...payload }));
    } else {
      const newCompany = { ...payload, recruiterId: recruiter.id };

      const data = await createCompany(newCompany); // recruiterId সহ backend-এ যাবে

      setCompany({
        ...newCompany,
        _id: data.insertedId,
        status: "approved", // backend-এর সাথে মিলিয়ে, admin page হলে "pending"
        plan: "Free",
        activeJobs: 0,
        jobLimit: 3,
      });
    }
    setShowForm(false);
  };

  return (
    <main className="min-h-screen bg-[#111111] p-8 text-white">
      <div className="mx-auto max-w-2xl">
        {/* ---------- কোম্পানি নেই: Banner ---------- */}
        {!company && (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[#404040] bg-[#161616] px-6 py-14 text-center">
            <h2 className="text-xl font-semibold">No company added yet</h2>
            <p className="max-w-sm text-sm text-gray-400">
              Add your company details to start posting jobs and hiring on
              HireLoop.
            </p>
            <Button onPress={() => setShowForm(true)}>Add Company</Button>
          </div>
        )}

        {/* ---------- কোম্পানি আছে: Card ---------- */}
        {company && (
          <div className="space-y-5 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#1c1c1c]">
                  {company.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={company.logo}
                      alt={company.companyName}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-gray-400">
                      {company.companyName?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    {company.companyName}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {company.industry} · {company.employeeRange}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
                  STATUS_STYLES[company.status] || STATUS_STYLES.pending
                }`}
              >
                {company.status}
              </span>
            </div>

            {company.status === "pending" && (
              <p className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-300">
                Your company is pending review. You can still edit your details
                while you wait.
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p>{company.location || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Website</p>
                {company.website ? (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {company.website}
                  </a>
                ) : (
                  <p>—</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-gray-300">{company.description || "—"}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onPress={() => setShowForm(true)}>
                Edit
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ---------- Modal Form ---------- */}
      {showForm && (
        <CompanyForm
          initialData={company}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </main>
  );
};

export default CompanyProfile;
