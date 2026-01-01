import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
}
