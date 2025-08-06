// src/Pages/Admin/AdminDashboard.jsx
import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data
  const users = [
    { id: 1, name: 'Abdul Raziq', type: 'Seller', status: 'Verified', location: 'Karachi', joined: '2023-04-15' },
    { id: 2, name: 'Sarah Johnson', type: 'Buyer', status: 'Verified', location: 'New York', joined: '2023-05-22' },
    { id: 3, name: 'Michael Chen', type: 'Buyer', status: 'Pending', location: 'Singapore', joined: '2023-06-10' },
    { id: 4, name: 'ERP Solutions', type: 'Seller', status: 'Verified', location: 'London', joined: '2023-03-18' },
    { id: 5, name: 'Tech Innovators', type: 'Buyer', status: 'Verified', location: 'San Francisco', joined: '2023-07-05' }
  ];

  const orders = [
    { id: 'ORD-1001', service: 'Inventory Dashboard', buyer: 'Sarah Johnson', seller: 'Abdul Raziq', status: 'In Progress', amount: '$250', due: '3 days' },
    { id: 'ORD-1002', service: 'CRM Setup', buyer: 'Michael Chen', seller: 'ERP Solutions', status: 'Completed', amount: '$180', due: 'Delivered' },
    { id: 'ORD-1003', service: 'Data Migration', buyer: 'Tech Innovators', seller: 'Abdul Raziq', status: 'Pending', amount: '$320', due: '5 days' },
    { id: 'ORD-1004', service: 'Financial Module', buyer: 'Global Retail', seller: 'ERP Solutions', status: 'In Progress', amount: '$210', due: '2 days' }
  ];

  const performance = [
    { name: 'Abdul Raziq', score: 8.7, rating: 4.9, response: '98%', level: 'Top Rated', orders: 45 },
    { name: 'ERP Solutions', score: 7.9, rating: 4.7, response: '95%', level: 'Level 3', orders: 32 },
    { name: 'Data Experts', score: 7.2, rating: 4.5, response: '92%', level: 'Level 2', orders: 28 }
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Verified: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-purple-100 text-purple-800',
      'Top Rated': 'bg-indigo-100 text-indigo-800',
      'Level 3': 'bg-green-100 text-green-800',
      'Level 2': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  // Tab content renderer
  const renderContent = () => {
    switch(activeTab) {
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">User Management</h2>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">Joined: {user.joined}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="mr-2 text-indigo-600 hover:text-indigo-900">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Orders & Projects</h2>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer/Seller</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.buyer}</div>
                      <div className="text-sm text-gray-500">{order.seller}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-indigo-600 hover:text-indigo-900">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'performance':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Seller Performance</h2>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performance.map(perf => (
                  <tr key={perf.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {perf.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{perf.rating}/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={perf.level} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {perf.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-indigo-600 hover:text-indigo-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default: // Dashboard view
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">248</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <span className="text-indigo-600 text-xl">👥</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="text-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-green-600 text-xl">📦</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="text-gray-600">Platform Revenue</p>
                    <p className="text-2xl font-bold">$12,580</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <p className="font-medium">New order placed</p>
                  <p className="text-sm text-gray-500">Inventory Dashboard Setup by Sarah Johnson</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium">Seller level upgraded</p>
                  <p className="text-sm text-gray-500">Abdul Raziq reached Top Rated status</p>
                  <p className="text-xs text-gray-400">5 hours ago</p>
                </div>
                
                <div className="border-b pb-3">
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">Michael Chen joined as a buyer</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
                
                <div>
                  <p className="font-medium">Order completed</p>
                  <p className="text-sm text-gray-500">CRM Development by ERP Solutions</p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">JustERPs Admin Dashboard</h1>
          <button className="bg-white text-indigo-700 px-4 py-1 rounded hover:bg-gray-100">
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-56 bg-gray-800 text-white flex-shrink-0">
          <ul className="py-4">
            <li 
              className={`px-6 py-3 cursor-pointer hover:bg-gray-700 ${
                activeTab === 'dashboard' ? 'bg-indigo-600' : ''
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </li>
            <li 
              className={`px-6 py-3 cursor-pointer hover:bg-gray-700 ${
                activeTab === 'users' ? 'bg-indigo-600' : ''
              }`}
              onClick={() => setActiveTab('users')}
            >
              👥 User Management
            </li>
            <li 
              className={`px-6 py-3 cursor-pointer hover:bg-gray-700 ${
                activeTab === 'orders' ? 'bg-indigo-600' : ''
              }`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders & Projects
            </li>
            <li 
              className={`px-6 py-3 cursor-pointer hover:bg-gray-700 ${
                activeTab === 'performance' ? 'bg-indigo-600' : ''
              }`}
              onClick={() => setActiveTab('performance')}
            >
              ⭐ Seller Performance
            </li>
          </ul>
          
          <div className="p-4 border-t border-gray-700 mt-auto">
            <div className="text-center text-sm text-gray-400">
              Platform Status: <span className="text-green-400">●</span> Operational
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'orders' && 'Orders & Projects'}
              {activeTab === 'performance' && 'Seller Performance'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'dashboard' && 'Summary of platform activity and metrics'}
              {activeTab === 'users' && 'Manage all buyers and sellers'}
              {activeTab === 'orders' && 'Track and manage active orders'}
              {activeTab === 'performance' && 'View seller ratings and performance'}
            </p>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;