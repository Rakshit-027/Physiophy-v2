import { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Plus,
  Menu,
  X
} from 'lucide-react';
import './MainAdmin.css';

// ✅ Ensure correct imports
import Home from './Home';
import AdminPanel from './AdminPanel';
import Testimonials from './Testimonials';
import MediaUpload from './MediaUpload';
import SettingsPage from './SettingsPage';

function MainAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Home'); // Store only one active tab at a time

  const sidebarItems = [
    { id: 'Home', icon: <LayoutDashboard size={20} />, label: 'Home', component: <Home /> },
    { id: 'Users', icon: <Calendar size={20} />, label: 'User', component: <AdminPanel /> },
    { id: 'Testimonial', icon: <Users size={20} />, label: 'Testimonial', component: <Testimonials /> },
    { id: 'Media Upload', icon: <MessageSquare size={20} />, label: 'Media Upload', component: <MediaUpload /> },
    { id: 'Settings', icon: <Settings size={20} />, label: 'Settings', component: <SettingsPage /> }
  ];

  const toggleTab = (id) => {
    setActiveTab(id); // Set only one active tab
  };

  return (
    <div className="zd-dental-dashboard">
      <div className="zd-app-container">
        <button
          className="zd-sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside className={`zd-sidebar ${isSidebarOpen ? 'zd-open' : ''}`}>
          <div className="zd-sidebar-content">
            <nav className="zd-nav-menu">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleTab(item.id)}
                  className={`zd-nav-item ${activeTab === item.id ? 'zd-active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="zd-main-content">
          <header className="zd-header">
            <div className="zd-header-content">
              <h1>{activeTab}</h1>
            </div>
          </header>

          <main className="zd-content">
            {sidebarItems.map((item) =>
              item.id === activeTab ? (
                <div key={item.id} className="zd-component">
                  {item.component}
                </div>
              ) : null
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainAdmin;
