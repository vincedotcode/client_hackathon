import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from './components/layout';
const inter = Inter({ subsets: ['latin'] })
import React, { useEffect, useState } from 'react';
import fetchRecruits from '../pages/api/getRecruits'; // Update the path


export default function Home() {
  const [recruits, setRecruits] = useState([]);
  const [numberOfApplicants, setNumberOfApplicants] = useState(0);
  const [numberOfApprovedRecruits, setNumberOfApprovedRecruits] = useState(0);


  useEffect(() => {
    async function fetchData() {
      const recruits = await fetchRecruits();


      if (Array.isArray(recruits)) {
        setRecruits(recruits);
        setNumberOfApplicants(recruits.length);
        setNumberOfApprovedRecruits(recruits.filter(recruit => recruit.status === 'approved').length);
      } else {
        console.log('Failed to fetch recruits or data is not an array');
      }
    }

    fetchData();
  }, []);
  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-white`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-sdworx-primary">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Number of Applicants" count={numberOfApplicants} />
            <DashboardCard title="Approved Recruits" count={numberOfApprovedRecruits} />
         
          </div>

        </div>
      </main>
    </Layout>
  )
}

function DashboardCard({ title, count }) {
  return (
    <div className="p-6 border rounded-md shadow">
      <h3 className="text-lg font-semibold mb-2 text-sdworx-secondary">{title}</h3>
      <p className="text-2xl font-bold text-sdworx-secondary">{count}</p>
    </div>
  );
}
