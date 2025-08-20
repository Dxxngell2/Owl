import React, { useState } from 'react';
import { Wallet, Settings, ToggleLeft, ToggleRight, Plus, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface PayoutWallet {
  id: string;
  currency: string;
  address: string;
  label: string;
  isDefault: boolean;
  verified: boolean;
  added: string;
}

interface PayoutRule {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  walletId: string;
  minAmount: number;
  enabled: boolean;
  created: string;
}

interface PayoutHistory {
  id: string;
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  payoutCurrency: string;
  walletAddress: string;
  exchangeRate: number;
  fee: number;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
  timestamp: string;
}

const Conversions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'wallets' | 'history'>('settings');
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [showAddRule, setShowAddRule] = useState(false);
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(true);

  const [walletForm, setWalletForm] = useState({
    currency: 'BTC',
    address: '',
    label: ''
  });

  const [ruleForm, setRuleForm] = useState({
    fromCurrency: 'ETH',
    toCurrency: 'BTC',
    walletId: '',
    minAmount: '0.01'
  });

  const currencies = [
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
    { code: 'USDT', name: 'Tether USD' },
    { code: 'LTC', name: 'Litecoin' },
    { code: 'BCH', name: 'Bitcoin Cash' }
  ];

  const [payoutWallets, setPayoutWallets] = useState<PayoutWallet[]>([
    {
      id: '1',
      currency: 'BTC',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      label: 'Main BTC Wallet',
      isDefault: true,
      verified: true,
      added: '2024-01-15'
    },
    {
      id: '2',
      currency: 'ETH',
      address: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
      label: 'Personal ETH Wallet',
      isDefault: false,
      verified: true,
      added: '2024-01-10'
    },
    {
      id: '3',
      currency: 'USDT',
      address: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C5',
      label: 'USDT Savings',
      isDefault: false,
      verified: false,
      added: '2024-01-20'
    }
  ]);

  const [payoutRules, setPayoutRules] = useState<PayoutRule[]>([
    {
      id: '1',
      fromCurrency: 'ETH',
      toCurrency: 'BTC',
      walletId: '1',
      minAmount: 0.1,
      enabled: true,
      created: '2024-01-15'
    },
    {
      id: '2',
      fromCurrency: 'USDT',
      toCurrency: 'BTC',
      walletId: '1',
      minAmount: 100,
      enabled: true,
      created: '2024-01-10'
    },
    {
      id: '3',
      fromCurrency: 'BTC',
      toCurrency: 'ETH',
      walletId: '2',
      minAmount: 0.01,
      enabled: false,
      created: '2024-01-08'
    }
  ]);

  const payoutHistory: PayoutHistory[] = [
    {
      id: '1',
      originalAmount: 1.5,
      originalCurrency: 'ETH',
      convertedAmount: 0.0523,
      payoutCurrency: 'BTC',
      walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      exchangeRate: 0.0349,
      fee: 0.0001,
      status: 'completed',
      txHash: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      timestamp: '2024-01-20 14:32'
    },
    {
      id: '2',
      originalAmount: 500,
      originalCurrency: 'USDT',
      convertedAmount: 0.0095,
      payoutCurrency: 'BTC',
      walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      exchangeRate: 0.000019,
      fee: 0.00005,
      status: 'pending',
      timestamp: '2024-01-19 16:20'
    },
    {
      id: '3',
      originalAmount: 0.05,
      originalCurrency: 'BTC',
      convertedAmount: 1.43,
      payoutCurrency: 'ETH',
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
      exchangeRate: 28.6,
      fee: 0.002,
      status: 'failed',
      timestamp: '2024-01-18 11:15'
    }
  ];

  const handleAddWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const newWallet: PayoutWallet = {
      id: Date.now().toString(),
      currency: walletForm.currency,
      address: walletForm.address,
      label: walletForm.label || `${walletForm.currency} Wallet`,
      isDefault: payoutWallets.length === 0,
      verified: false,
      added: new Date().toISOString().split('T')[0]
    };
    setPayoutWallets([...payoutWallets, newWallet]);
    setWalletForm({ currency: 'BTC', address: '', label: '' });
    setShowAddWallet(false);
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule: PayoutRule = {
      id: Date.now().toString(),
      fromCurrency: ruleForm.fromCurrency,
      toCurrency: ruleForm.toCurrency,
      walletId: ruleForm.walletId,
      minAmount: parseFloat(ruleForm.minAmount),
      enabled: true,
      created: new Date().toISOString().split('T')[0]
    };
    setPayoutRules([...payoutRules, newRule]);
    setRuleForm({ fromCurrency: 'ETH', toCurrency: 'BTC', walletId: '', minAmount: '0.01' });
    setShowAddRule(false);
  };

  const toggleRuleStatus = (ruleId: string) => {
    setPayoutRules(payoutRules.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setPayoutRules(payoutRules.filter(rule => rule.id !== ruleId));
  };

  const deleteWallet = (walletId: string) => {
    setPayoutWallets(payoutWallets.filter(wallet => wallet.id !== walletId));
  };

  const setDefaultWallet = (walletId: string) => {
    setPayoutWallets(payoutWallets.map(wallet => ({
      ...wallet,
      isDefault: wallet.id === walletId
    })));
  };

  const getWalletByCurrency = (currency: string) => {
    return payoutWallets.find(w => w.currency === currency);
  };

  const getWalletById = (id: string) => {
    return payoutWallets.find(w => w.id === id);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return AlertCircle;
      default: return Clock;
    }
  };

  const totalConverted = payoutHistory
    .filter(h => h.status === 'completed')
    .reduce((sum, h) => sum + h.convertedAmount, 0);

  const pendingPayouts = payoutHistory.filter(h => h.status === 'pending').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Auto Payout Conversions</h1>
          <p className="text-slate-400 mt-1">Automatically convert and send payments to your preferred wallets</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-slate-300">Auto Payout</span>
            <button
              onClick={() => setAutoPayoutEnabled(!autoPayoutEnabled)}
              className="p-1"
            >
              {autoPayoutEnabled ? (
                <ToggleRight className="w-8 h-8 text-green-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Converted</span>
            <Wallet className="w-5 h-5 text-teal-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalConverted.toFixed(4)} BTC</p>
          <p className="text-green-400 text-sm mt-1">+12.5% this month</p>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Active Rules</span>
            <Settings className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">{payoutRules.filter(r => r.enabled).length}</p>
          <p className="text-slate-400 text-sm mt-1">Out of {payoutRules.length} total</p>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Pending Payouts</span>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">{pendingPayouts}</p>
          <p className="text-slate-400 text-sm mt-1">Awaiting confirmation</p>
        </div>
      </div>

      {/* Status Alert */}
      {!autoPayoutEnabled && (
        <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">Auto Payout is currently disabled</span>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Payments will accumulate in your account. Enable auto payout to automatically convert and transfer to your wallets.
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'settings'
              ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white border border-teal-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Payout Rules
        </button>
        <button
          onClick={() => setActiveTab('wallets')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'wallets'
              ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white border border-teal-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          Wallets
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 text-white border border-teal-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          History
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Conversion Rules</h2>
            <button
              onClick={() => setShowAddRule(true)}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Rule</span>
            </button>
          </div>

          {/* Add Rule Form */}
          {showAddRule && (
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Add Conversion Rule</h3>
              <form onSubmit={handleAddRule} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">From Currency</label>
                    <select
                      value={ruleForm.fromCurrency}
                      onChange={(e) => setRuleForm({...ruleForm, fromCurrency: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">To Currency</label>
                    <select
                      value={ruleForm.toCurrency}
                      onChange={(e) => setRuleForm({...ruleForm, toCurrency: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Target Wallet</label>
                    <select
                      value={ruleForm.walletId}
                      onChange={(e) => setRuleForm({...ruleForm, walletId: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                      required
                    >
                      <option value="">Select wallet...</option>
                      {payoutWallets.filter(w => w.currency === ruleForm.toCurrency).map(wallet => (
                        <option key={wallet.id} value={wallet.id}>{wallet.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Minimum Amount</label>
                    <input
                      type="number"
                      step="0.00000001"
                      value={ruleForm.minAmount}
                      onChange={(e) => setRuleForm({...ruleForm, minAmount: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                      placeholder="0.01"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Add Rule
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddRule(false)}
                    className="px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-teal-400 hover:text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Rules List */}
          <div className="space-y-4">
            {payoutRules.map((rule) => {
              const wallet = getWalletById(rule.walletId);
              return (
                <div key={rule.id} className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold text-white">
                        {rule.fromCurrency} → {rule.toCurrency}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        rule.enabled ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-slate-400 bg-slate-400/10 border-slate-400/20'
                      }`}>
                        {rule.enabled ? 'Active' : 'Disabled'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleRuleStatus(rule.id)}
                        className="p-1"
                      >
                        {rule.enabled ? (
                          <ToggleRight className="w-6 h-6 text-green-400" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-slate-500" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Target Wallet:</span>
                      <div className="text-white font-medium">{wallet?.label}</div>
                      <div className="text-slate-400 font-mono text-xs">{wallet ? truncateAddress(wallet.address) : 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Minimum Amount:</span>
                      <div className="text-white font-medium">{rule.minAmount} {rule.fromCurrency}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Created:</span>
                      <div className="text-white font-medium">{rule.created}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'wallets' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Payout Wallets</h2>
            <button
              onClick={() => setShowAddWallet(true)}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Wallet</span>
            </button>
          </div>

          {/* Add Wallet Form */}
          {showAddWallet && (
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Add Payout Wallet</h3>
              <form onSubmit={handleAddWallet} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                    <select
                      value={walletForm.currency}
                      onChange={(e) => setWalletForm({...walletForm, currency: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Label</label>
                    <input
                      type="text"
                      value={walletForm.label}
                      onChange={(e) => setWalletForm({...walletForm, label: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                      placeholder="My BTC Wallet"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    value={walletForm.address}
                    onChange={(e) => setWalletForm({...walletForm, address: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                    placeholder="Enter wallet address"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Add Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddWallet(false)}
                    className="px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-teal-400 hover:text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Wallets List */}
          <div className="grid md:grid-cols-2 gap-6">
            {payoutWallets.map((wallet) => (
              <div key={wallet.id} className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{wallet.currency}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{wallet.label}</h3>
                      <div className="flex items-center space-x-2">
                        {wallet.isDefault && (
                          <span className="px-2 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-lg border border-teal-500/30">
                            Default
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-lg border ${
                          wallet.verified 
                            ? 'text-green-400 bg-green-400/10 border-green-400/20' 
                            : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                        }`}>
                          {wallet.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteWallet(wallet.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-400 text-sm">Address:</span>
                    <div className="text-white font-mono text-sm break-all">{truncateAddress(wallet.address)}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Added: {wallet.added}</span>
                    {!wallet.isDefault && (
                      <button
                        onClick={() => setDefaultWallet(wallet.id)}
                        className="text-teal-400 hover:text-teal-300 transition-colors duration-200"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Payout History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Original</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Converted</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Wallet</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Status</th>
                  <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((payout) => {
                  const StatusIcon = getStatusIcon(payout.status);
                  return (
                    <tr key={payout.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors duration-200">
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          <div className="text-white font-semibold">
                            {payout.originalAmount} {payout.originalCurrency}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          <div className="text-white font-semibold">
                            {payout.convertedAmount.toFixed(8)} {payout.payoutCurrency}
                          </div>
                          <div className="text-slate-400 text-sm">
                            Rate: {payout.exchangeRate} | Fee: {payout.fee}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-slate-300 font-mono text-sm">
                          {truncateAddress(payout.walletAddress)}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="space-y-2">
                          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payout.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{payout.status}</span>
                          </div>
                          {payout.txHash && (
                            <div className="text-xs text-slate-400 font-mono">
                              {truncateAddress(payout.txHash)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-slate-300">
                        {payout.timestamp}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversions;