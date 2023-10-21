
import Image from 'next/image';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    setError('');
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      Swal.close();

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
        return;
      }

      const { token } = await res.json();
      const decodedToken = jwtDecode(token);
      localStorage.setItem('details', decodedToken)
      localStorage.setItem('token', token);
      Swal.fire({
        title: 'Success!',
        text: 'Login successful.',
        icon: 'success',
        confirmButtonText: 'Go to Dashboard'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/dashboard');
        }
      });

    } catch (err) {
      Swal.close();

      setError('Failed to login. Please try again.');
      console.error(err);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded px-8 pt-10 pb-8 flex flex-col w-96">
        <div className="flex justify-center mb-6">
          <Image src="/assets/SD_logo_baseline_RGB.png" alt="SD Worx Logo" width={500} height={500} />
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sdworx-red text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="mb-6">
          <label className="block text-sdworx-red text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>

        <div className="flex items-center justify-between">
          <button onClick={handleLogin}
            className="bg-sdworx-primary hover:bg-sdworx-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-sdworx-blue hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  )
}
