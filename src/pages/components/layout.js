import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
    const router = useRouter();

    const showSidebar = router.pathname !== '/login';

    return (
        <div className="flex">
            {showSidebar && <Sidebar />}
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
