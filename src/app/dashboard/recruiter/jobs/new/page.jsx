import PostJobForm from '@/app/dashboard/recruiter/jobs/new/PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import React from 'react';

const NewJobs =async () => {
      const company = await getLoggedInRecruiterCompany();
    return (
        <div>
            <h2>Creat New Jobs</h2>
            <PostJobForm company={company}/>
        </div>
    );
};

export default NewJobs;