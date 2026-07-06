/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  LayoutDashboard, ShoppingCart, Package, Users, Settings, 
  TrendingUp, Activity, DollarSign, Search, Bell, Menu, X, ArrowLeft
} from 'lucide-react';

interface AdminProps {
  setCurrentPage: (page: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ setCurrentPage }) => {
  const { products, orders, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculate some simple stats based on mock data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  // const activeProducts = products.length; // Uncomment if needed
  
  // Mock recent users since we don't have a users array in context
  const recentCustomers = currentUser ? [currentUser] : [];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart },
    { id: 'products', label: 'Inventory', icon: Package },
    { id: 'customers', label: 'Customer Base', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-brand-purple flex flex-col md:flex-row text-brand-cream font-sans">
      
      {/* Mobile Header for Sidebar Toggle */}
      <div className="md:hidden bg-brand-purple-dark border-b border-brand-cream/10 p-4 flex justify-between items-center z-50">
        <h2 className="font-editorial text-xl font-bold text-brand-gold">Vicesh Admin</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-brand-cream">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar Layout */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:relative z-40 w-64 h-full min-h-screen 
        bg-brand-purple-dark border-r border-brand-cream/10 flex flex-col transition-transform duration-300
      `}>
        <div className="p-6 hidden md:block">
          <h2 className="font-editorial text-2xl font-bold text-brand-gold tracking-wide">Vicesh Portal</h2>
          <p className="text-[10px] text-brand-cream/70 uppercase tracking-widest mt-1">Management HQ</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-brand-forest text-brand-cream border border-brand-gold/20' 
                    : 'text-brand-cream/70 hover:bg-brand-beige/10 hover:text-brand-cream'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-brand-gold' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-brand-cream/10">
          <button 
            onClick={() => setCurrentPage('home')}
            className="w-full flex items-center gap-2 px-4 py-3 text-xs text-brand-cream/70 hover:text-brand-cream transition-colors uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit to Storefront
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-brand-beige/40 px-8 py-4 flex justify-between items-center shrink-0">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
            <input 
              type="text" 
              placeholder="Search orders, products..." 
              className="w-full bg-brand-offwhite border border-brand-beige/40 text-xs rounded-full py-2 pl-9 pr-4 focus:outline-none focus:border-brand-gold/50 text-brand-charcoal shadow-inner"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-brand-gray hover:text-brand-charcoal transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-gold rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-brand-beige/40 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-brand-charcoal">Admin User</p>
                <p className="text-[10px] text-brand-gray uppercase tracking-wider">Superadmin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-forest border border-brand-gold/30 flex items-center justify-center text-brand-gold font-editorial font-bold text-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-brand-offwhite">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="font-editorial text-3xl font-bold text-brand-charcoal">Sanctuary Overview</h1>
                  <p className="text-xs text-brand-gray mt-1 uppercase tracking-wider">Performance metrics for today</p>
                </div>
                <button className="hidden sm:flex text-[10px] font-bold uppercase tracking-widest bg-brand-forest text-white px-4 py-2 rounded-xs border border-brand-gold/20 items-center gap-2 cursor-pointer shadow-sm hover:bg-brand-sage transition-colors">
                  Generate Report
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, trend: '+12.5%' },
                  { label: 'Active Orders', value: totalOrders.toString(), icon: ShoppingCart, trend: '+5.2%' },
                  { label: 'Store Visitors', value: '1,248', icon: Activity, trend: '+18.1%' },
                  { label: 'Conversion Rate', value: '3.4%', icon: TrendingUp, trend: '+1.1%' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white border border-brand-beige/40 rounded-xs p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-brand-forest/10 flex items-center justify-center text-brand-gold">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-brand-sage bg-brand-sage/10 px-2 py-1 rounded-full border border-brand-sage/20">
                          {stat.trend}
                        </span>
                      </div>
                      <div>
                        <p className="text-2xl font-editorial font-bold text-brand-charcoal">{stat.value}</p>
                        <p className="text-[10px] text-brand-gray uppercase tracking-wider font-semibold mt-0.5">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white border border-brand-beige/40 rounded-xs overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-brand-beige/40 flex justify-between items-center bg-brand-offwhite/50">
                  <h3 className="font-editorial text-xl font-bold text-brand-charcoal">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-brand-gold hover:underline font-semibold cursor-pointer">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-offwhite text-brand-gray uppercase tracking-wider border-b border-brand-beige/40">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Order ID</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-beige/40">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-brand-offwhite transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-brand-charcoal">{order.id}</td>
                          <td className="px-6 py-4 text-brand-gray">{order.date}</td>
                          <td className="px-6 py-4">
                            <span className="bg-brand-sage/10 text-brand-sage border border-brand-sage/20 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-brand-charcoal">${order.total.toFixed(2)}</td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-brand-gray">No orders placed yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h1 className="font-editorial text-3xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-4">Order Management</h1>
              <div className="bg-white border border-brand-beige/40 rounded-xs overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-offwhite text-brand-gray uppercase tracking-wider border-b border-brand-beige/40">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Order ID</th>
                        <th className="px-6 py-4 font-semibold">Customer Name</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Items</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-beige/40">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-brand-offwhite transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-brand-charcoal">{order.id}</td>
                          <td className="px-6 py-4 font-medium text-brand-charcoal">{order.shippingAddress.fullName}</td>
                          <td className="px-6 py-4 text-brand-gray">{order.date}</td>
                          <td className="px-6 py-4 text-brand-gray">{order.items.reduce((sum, item) => sum + item.quantity, 0)} units</td>
                          <td className="px-6 py-4 font-bold text-brand-charcoal">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className="bg-brand-sage/10 text-brand-sage border border-brand-sage/20 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-brand-gray">No orders found in the database.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-brand-beige/40 pb-4">
                <h1 className="font-editorial text-3xl font-bold text-brand-charcoal">Botanical Inventory</h1>
                <button className="text-[10px] font-bold uppercase tracking-widest bg-brand-gold text-white px-4 py-2 rounded-xs shadow-md cursor-pointer hover:bg-brand-gold-light transition-colors">
                  + Add Product
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white border border-brand-beige/40 rounded-xs overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-brand-beige/20 relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-[10px] uppercase font-bold rounded-sm border border-brand-beige/40 text-brand-charcoal shadow-sm">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-editorial font-bold text-brand-charcoal mb-1">{product.name}</h3>
                      <p className="text-xs text-brand-gold font-bold mb-3">${product.price.toFixed(2)}</p>
                      
                      <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-[10px] uppercase tracking-wider text-brand-gray font-semibold">
                          <span>Stock Level</span>
                          <span className={product.stock < 10 ? 'text-red-500 font-bold' : 'text-brand-sage font-bold'}>
                            {product.stock} units
                          </span>
                        </div>
                        <div className="w-full bg-brand-beige/40 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${product.stock < 10 ? 'bg-red-500' : 'bg-brand-sage'}`} 
                            style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h1 className="font-editorial text-3xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-4">Customer Directory</h1>
              <div className="bg-white border border-brand-beige/40 rounded-xs overflow-hidden p-6 shadow-sm">
                {recentCustomers.length === 0 ? (
                  <p className="text-center text-sm text-brand-gray py-8">No customers registered yet.</p>
                ) : (
                  <div className="space-y-4">
                    {recentCustomers.map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between border-b border-brand-beige/40 pb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-forest/10 flex items-center justify-center font-editorial text-xl font-bold text-brand-gold border border-brand-beige/40">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-brand-charcoal">{customer.name}</p>
                            <p className="text-xs text-brand-gray">{customer.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wider text-brand-gray font-semibold">Loyalty Points</p>
                          <p className="font-bold text-brand-gold">{customer.loyaltyPoints}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <h1 className="font-editorial text-3xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-4">System Settings</h1>
              <div className="bg-white border border-brand-beige/40 rounded-xs p-6 space-y-6 shadow-sm">
                
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-brand-beige/40 pb-2 text-brand-charcoal">Store Profile</h3>
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-brand-gray font-semibold mb-1">Store Name</label>
                      <input type="text" defaultValue="Vicesh Cosmetics" className="w-full bg-brand-offwhite border border-brand-beige/40 rounded-xs px-3 py-2 text-brand-charcoal focus:border-brand-gold outline-none shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-brand-gray font-semibold mb-1">Contact Email</label>
                      <input type="email" defaultValue="viceshcompanyltd@gmail.com" className="w-full bg-brand-offwhite border border-brand-beige/40 rounded-xs px-3 py-2 text-brand-charcoal focus:border-brand-gold outline-none shadow-sm" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-brand-beige/40 pb-2 text-brand-charcoal">Notifications</h3>
                  <div className="space-y-3 text-xs text-brand-charcoal">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded-sm accent-brand-gold" />
                      <span>Email me when a new order is placed</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded-sm accent-brand-gold" />
                      <span>Send daily revenue summary</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded-sm accent-brand-gold" />
                      <span>Low stock alerts (under 10 units)</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-beige/40 text-right">
                  <button className="bg-brand-forest text-white px-6 py-2 rounded-xs font-bold uppercase tracking-wider text-xs cursor-pointer shadow-sm hover:bg-brand-sage transition-colors">Save Changes</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
