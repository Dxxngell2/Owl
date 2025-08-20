import React, { useState } from 'react';
import { Search, Filter, Download, ExternalLink, Copy, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  txid: string;
  amount: string;
  crypto: string;
  usdAmount: number;
  status: 'Pending' | 'Confirmed' | 'Failed';
  date: string;
  time: string;
  customer: string;
  description: string;
  confirmations: number;
  requiredConfirmations: number;
}

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cryptoFilter, setCryptoFilter] = useState('All');

  const transactions: Transaction[] = [
    {
      id: '1',
      txid: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      amount: '0.0235',
      crypto: 'BTC',
      usdAmount: 1250.00,
      status: 'Confirmed',
      date: '2024-01-20',
      time: '14:32',
      customer: 'john@example.com',
      description: 'Premium subscription',
      confirmations: 6,
      requiredConfirmations: 3
    },
    {
      id: '2',
      txid: '0x2f9840a85d5af5bf1d1762f925bdaddc4201f985',
      amount: '1.5847',
      crypto: 'ETH',
      usdAmount: 3210.45,
      status: 'Pending',
      date: '2024-01-20',
      time: '13:15',
      customer: 'sarah@example.com',
      description: 'Digital product purchase',
      confirmations: 1,
      requiredConfirmations: 12
    },
    {
      id: '3',
      txid: '0x3f9840a85d5af5bf1d1762f925bdaddc4201f986',
      amount: '500.00',
      crypto: 'USDT',
      usdAmount: 500.00,
      status: 'Confirmed',
      date: '2024-01-19',
      time: '16:45',
      customer: 'mike@example.com',
      description: 'Service payment',
      confirmations: 20,
      requiredConfirmations: 12
    },
    {
      id: '4',
      txid: '0x4f9840a85d5af5bf1d1762f925bdaddc4201f987',
      amount: '0.1250',
      crypto: 'BTC',
      usdAmount: 6500.00,
      status: 'Failed',
      date: '2024-01-19',
      time: '11:20',
      customer: 'anna@example.com',
      description: 'Consultation fee',
      confirmations: 0,
      requiredConfirmations: 3
    },
    {
      id: '5',
      txid: '0x5f9840a85d5af5bf1d1762f925bdaddc4201f988',
      amount: '2.3456',
      crypto: 'ETH',
      usdAmount: 4890.12,
      status: 'Confirmed',
      date: '2024-01-18',
      time: '09:30',
      customer: 'david@example.com',
      description: 'Software license',
      confirmations: 25,
      requiredConfirmations: 12
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return CheckCircle;
      case 'Pending': return Clock;
      case 'Failed': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.txid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    const matchesCrypto = cryptoFilter === 'All' || tx.crypto === cryptoFilter;
    
    return matchesSearch && matchesStatus && matchesCrypto;
  });

  const totalVolume = transactions
    .filter(tx => tx.status === 'Confirmed')
    .reduce((sum, tx) => sum + tx.usdAmount, 0);

  const pendingCount = transactions.filter(tx => tx.status === 'Pending').length;
  const confirmedCount = transactions.filter(tx => tx.status === 'Confirmed').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Transactions</h1>
          <p className="text-slate-400 mt-1">View and manage all your payment transactions</p>
        </div>
        
        <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Volume</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">${totalVolume.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">+12.5% from last month</p>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Confirmed</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{confirmedCount}</p>
          <p className="text-slate-400 text-sm mt-1">Successful payments</p>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Pending</span>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">{pendingCount}</p>
          <p className="text-slate-400 text-sm mt-1">Awaiting confirmation</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <select
              value={cryptoFilter}
              onChange={(e) => setCryptoFilter(e.target.value)}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
            >
              <option value="All">All Crypto</option>
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Transaction</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Amount</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Status</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Customer</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Date</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => {
                const StatusIcon = getStatusIcon(tx.status);
                return (
                  <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors duration-200">
                    <td className="py-4 px-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-mono text-sm">{truncateHash(tx.txid)}</span>
                          <button
                            onClick={() => copyToClipboard(tx.txid)}
                            className="p-1 hover:bg-slate-700 rounded transition-colors duration-200"
                          >
                            <Copy className="w-3 h-3 text-slate-400" />
                          </button>
                        </div>
                        <p className="text-slate-400 text-xs">{tx.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="space-y-1">
                        <div className="text-white font-semibold">{tx.amount} {tx.crypto}</div>
                        <div className="text-slate-400 text-sm">${tx.usdAmount.toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="space-y-2">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tx.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{tx.status}</span>
                        </div>
                        {tx.status === 'Pending' && (
                          <div className="text-xs text-slate-400">
                            {tx.confirmations}/{tx.requiredConfirmations} confirmations
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-slate-300">{tx.customer}</td>
                    <td className="py-4 px-2">
                      <div className="space-y-1">
                        <div className="text-slate-300">{tx.date}</div>
                        <div className="text-slate-400 text-sm">{tx.time}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">No transactions found</div>
            <div className="text-slate-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;