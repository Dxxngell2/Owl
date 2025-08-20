import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Calendar, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  active: boolean;
  subscribers: number;
  created: string;
}

interface Subscriber {
  id: string;
  email: string;
  plan: string;
  status: 'active' | 'cancelled' | 'past_due';
  nextPayment: string;
  totalPaid: number;
  joined: string;
}

const Subscriptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'subscribers'>('plans');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Subscription | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    interval: 'monthly' as 'monthly' | 'yearly',
    features: ['']
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      name: 'Basic Plan',
      description: 'Perfect for small businesses',
      price: 29,
      currency: 'USD',
      interval: 'monthly',
      features: ['Up to 100 transactions', 'Email support', 'Basic analytics'],
      active: true,
      subscribers: 45,
      created: '2024-01-15'
    },
    {
      id: '2',
      name: 'Pro Plan',
      description: 'For growing businesses',
      price: 99,
      currency: 'USD',
      interval: 'monthly',
      features: ['Unlimited transactions', 'Priority support', 'Advanced analytics', 'Custom webhooks'],
      active: true,
      subscribers: 23,
      created: '2024-01-10'
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'For large organizations',
      price: 299,
      currency: 'USD',
      interval: 'monthly',
      features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
      active: false,
      subscribers: 5,
      created: '2024-01-05'
    }
  ]);

  const subscribers: Subscriber[] = [
    {
      id: '1',
      email: 'john@company.com',
      plan: 'Pro Plan',
      status: 'active',
      nextPayment: '2024-02-15',
      totalPaid: 297,
      joined: '2023-11-15'
    },
    {
      id: '2',
      email: 'sarah@startup.io',
      plan: 'Basic Plan',
      status: 'active',
      nextPayment: '2024-02-10',
      totalPaid: 87,
      joined: '2023-11-10'
    },
    {
      id: '3',
      email: 'mike@enterprise.com',
      plan: 'Enterprise',
      status: 'past_due',
      nextPayment: '2024-01-25',
      totalPaid: 1495,
      joined: '2023-06-01'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan: Subscription = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      currency: formData.currency,
      interval: formData.interval,
      features: formData.features.filter(f => f.trim() !== ''),
      active: true,
      subscribers: 0,
      created: new Date().toISOString().split('T')[0]
    };

    if (editingPlan) {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === editingPlan.id ? { ...newPlan, id: editingPlan.id, subscribers: editingPlan.subscribers } : sub
      ));
      setEditingPlan(null);
    } else {
      setSubscriptions([...subscriptions, newPlan]);
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'USD',
      interval: 'monthly',
      features: ['']
    });
    setShowCreateForm(false);
  };

  const togglePlanStatus = (planId: string) => {
    setSubscriptions(subscriptions.map(sub =>
      sub.id === planId ? { ...sub, active: !sub.active } : sub
    ));
  };

  const deletePlan = (planId: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== planId));
  };

  const editPlan = (plan: Subscription) => {
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price.toString(),
      currency: plan.currency,
      interval: plan.interval,
      features: plan.features
    });
    setEditingPlan(plan);
    setShowCreateForm(true);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'past_due': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const totalRevenue = subscriptions.reduce((sum, sub) => sum + (sub.price * sub.subscribers), 0);
  const totalSubscribers = subscriptions.reduce((sum, sub) => sum + sub.subscribers, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
          <p className="text-slate-400 mt-1">Manage subscription plans and subscribers</p>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Plan</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Monthly Revenue</span>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">+15.3% from last month</p>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Subscribers</span>
            <Users className="w-5 h-5 text-teal-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalSubscribers}</p>
          <p className="text-teal-400 text-sm mt-1">+8 new this week</p>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Active Plans</span>
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{subscriptions.filter(s => s.active).length}</p>
          <p className="text-slate-400 text-sm mt-1">Out of {subscriptions.length} total</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'plans'
              ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white border border-teal-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Subscription Plans
        </button>
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'subscribers'
              ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white border border-teal-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Subscribers
        </button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            {editingPlan ? 'Edit Plan' : 'Create New Plan'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                  placeholder="e.g., Pro Plan"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Price
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-600">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:bg-slate-600"
                    placeholder="29.99"
                    required
                  />
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="px-4 py-3 bg-slate-600 text-white border-l border-slate-500 focus:outline-none"
                  >
                    <option value="USD">USD</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                placeholder="Brief description of the plan"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Billing Interval
              </label>
              <select
                value={formData.interval}
                onChange={(e) => setFormData({...formData, interval: e.target.value as 'monthly' | 'yearly'})}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Features
              </label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                      placeholder="Feature description"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-teal-400 hover:text-teal-300 text-sm transition-colors duration-200"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingPlan(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    currency: 'USD',
                    interval: 'monthly',
                    features: ['']
                  });
                }}
                className="px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-teal-400 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'plans' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((plan) => (
            <div key={plan.id} className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>
                <button
                  onClick={() => togglePlanStatus(plan.id)}
                  className="p-1"
                >
                  {plan.active ? (
                    <ToggleRight className="w-6 h-6 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-500" />
                  )}
                </button>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-1">
                  ${plan.price}
                  <span className="text-lg text-slate-400 font-normal">/{plan.interval}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                <span>{plan.subscribers} subscribers</span>
                <span>Created {plan.created}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => editPlan(plan)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Subscriber</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Plan</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Status</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Next Payment</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Total Paid</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Joined</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors duration-200">
                    <td className="py-4 px-2 text-white">{subscriber.email}</td>
                    <td className="py-4 px-2 text-slate-300">{subscriber.plan}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscriber.status)}`}>
                        {subscriber.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-slate-300">{subscriber.nextPayment}</td>
                    <td className="py-4 px-2 text-white font-semibold">${subscriber.totalPaid}</td>
                    <td className="py-4 px-2 text-slate-300">{subscriber.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;