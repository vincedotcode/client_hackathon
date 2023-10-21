
import React, { useEffect, useState } from 'react';
import Layout from './components/layout';
import { useRouter } from 'next/router';
import fetchJobs, { fetchJobDetails } from '../pages/api/getJobs';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [topRecruit, setTopRecruit] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const allJobs = await fetchJobs();
            setJobs(allJobs);
            setTotalPages(Math.ceil(allJobs.length / 4));
        }
        fetchData();
    }, []);

    const navigateToRecruit = async (jobLink) => {
        const jobDetails = await fetchJobDetails(jobLink); // Fetch job details from API
        const recruit = await findTopRecruit(jobDetails); // Fetch top recruit based on job details
        setModalContent(jobDetails.content);
        setTopRecruit(recruit);
        setShowModal(true);
    };

    const navigateToJob = (id) => {
        router.push(id);
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const jobsToShow = jobs.slice((currentPage - 1) * 4, currentPage * 4);

    return (
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-black">Title</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-black">department</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-black">location</th>
                            <th className="py-2 px-4 border-b border-gray-200 text-black">Find Match</th>
                        </tr>
                    </thead>
                <table className="min-w-full bg-white">
                    <tbody>
                        {jobsToShow.map((job, index) => (
                        <tr key={index} className="cursor-pointer">
                        <td className="py-2 px-4 border-b border-gray-200 text-sdworx-primary">{job.title}</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-sdworx-primary">{job.department}</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-sdworx-primary">{job.title}</td>
                      
                        <td className="py-2 px-4 border-b border-gray-200 text-sdworx-primary">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => navigateToRecruit(job.jobLink)}>
                                Find
                            </button>
                        </td>
                    </tr>
                        ))}
                    </tbody>
                </table>
                
            
                <div className="mt-4 ">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className='bg-sdworx-primary px-4 rounded'>
                        Previous
                    </button>
                    <span className="mx-2 text-sdworx-secondary px-4 rounded">{currentPage}/{totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className='bg-sdworx-primary px-4 rounded'>
                        Next
                    </button>
                </div>
            </main>
        </Layout>
    );
}
