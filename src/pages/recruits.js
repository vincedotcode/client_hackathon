import React, { useEffect, useState } from 'react';
import Layout from './components/layout';
import { useRouter } from 'next/router';
import fetchRecruits from '../pages/api/getRecruits';

export default function Recruits() {
    const [recruits, setRecruits] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const recruits = await fetchRecruits();
            setRecruits(recruits);
        }
        fetchData();
    }, []);

    const navigateToRecruit = (id) => {
        router.push(`/recruit/${id}`);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/uploadRecruits', { method: 'POST', body: formData });
            if (response.ok) {
                fetchData();
                setModalOpen(false);
            } else {
                console.error('Failed to upload data.');
            }
        } catch (error) {
            console.error('There was an error uploading the data:', error);
        }
    };


    return (
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <button onClick={() => setModalOpen(true)} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Upload
                </button>
                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded">
                            <h2 className="text-xl mb-4">Upload File</h2>
                            <form onSubmit={handleUpload}>
                                <input type="file" onChange={handleFileChange} className="mb-4" />
                                <button type="submit" className="bg-blue-500 text-white py-1 px-2 rounded">Submit</button>
                                <button type="button" className="ml-2" onClick={() => setModalOpen(false)}>Close</button>
                            </form>
                        </div>
                    </div>
                )}
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-black">Full Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruits.map((recruit) => (
                            <tr key={recruit._id} onClick={() => navigateToRecruit(recruit._id)} className="cursor-pointer">
                                <td className="py-2 px-4 border-b border-gray-200 text-sdworx-primary">{recruit.fullName}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <span
                                        className={`py-1 px-3 rounded-full text-xs ${recruit.status === 'Pending' ? 'bg-yellow-200 text-yellow-800'
                                                : recruit.status === 'Approved' ? 'bg-green-200 text-green-800'
                                                    : 'bg-red-200 text-red-800'
                                            }`}
                                    >
                                        {recruit.status}
                                    </span>
                                </td>
                           
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </Layout>
    );
}
