"use client";
import { useState } from 'react';
export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <nav>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>Toggle Sidebar</button>
        {isCollapsed ? null : <div>Sidebar</div>}
      </nav>
      <main>{children}</main>
    </div>
  );
}
