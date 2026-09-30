"use client";

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL

export const creatJob = async (newJobData) => {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });
  console.log(res, "responce in jobs actions");
  return res.json();
};
