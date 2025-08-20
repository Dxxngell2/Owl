import React from 'react';
import { ExternalLink, Copy } from 'lucide-react';

interface Transaction {
  id: string;
  txid: string;
  amount: string;
  crypto: string;
  status: 'Pending' | 'Confirmed' | 'Failed';
  date: string;
}

const TransactionsTable: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      txid: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      amount: '0.0235',
      crypto: 'BTC',
      status: 'Confirmed',
      date: '2024-01-15'
    },
    {
      id: '2', 
      txid: '0x2f9840a85d5af5bf1d1762f925bdaddc4201f985',
      amount: '1.5847',
      crypto: 'ETH',
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: '3',
      txid: '0x3f9840a85d5af5bf1d1762f925bdaddc4201f986',
      amount: '500.00',
      crypto: 'USDT',
      status: 'Confirmed',
      date: '2024-01-13'
    },
    {
      id: '4',
      txid: '0x4f9840a85d5af5bf1d1762f925bdaddc4201f987',
      amount: '0.1250',
      crypto: 'BTC',
      status: 'Failed',
      date: '2024-01-12'
    }
  ];

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

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Transaction ID</th>
            <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Amount</th>
            <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Crypto</th>
            <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Status</th>
            <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Date</th>
            <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors duration-200">
              <td className="py-4 px-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-mono text-sm">{truncateHash(tx.txid)}</span>
                  <button
                    onClick={() => copyToClipboard(tx.txid)}
                    className="p-1 hover:bg-slate-700 rounded transition-colors duration-200"
                  >
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </td>
              <td className="py-4 px-2 text-white font-semibold">{tx.amount}</td>
              <td className="py-4 px-2">
                <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-lg font-medium">
                  {tx.crypto}
                </span>
              </td>
              <td className="py-4 px-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tx.status)}`}>
                  {tx.status}
                </span>
              </td>
              <td className="py-4 px-2 text-slate-300">{tx.date}</td>
              <td className="py-4 px-2">
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;