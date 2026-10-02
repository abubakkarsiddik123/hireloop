const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const serverFetch=async(path)=>{
  const res =await fetch(`${baseUrl}${path}`);
  return res.json();
}

export const serverMutation=async(path,data)=>{
     const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res, "response in company actions");
//   handle 404,401,403
  return res.json();
}