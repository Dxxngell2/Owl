import React from 'react';
import { Wallet, Eye, EyeOff } from 'lucide-react';

const BalanceCard: React.FC = () => {
  const [showBalance, setShowBalance] = React.useState(true);
  
  const balanceData = {
    btc: { amount: '0.05847', usd: 2543.78 },
    eth: { amount: '1.2847', usd: 3210.45 },
    usdt: { amount: '1250.00', usd: 1250.00 }
  };
  
  const totalUsd = Object.values(balanceData).reduce((sum, coin) => sum + coin.usd, 0);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="w-6 h-6 text-teal-400" />
          <span className="text-slate-400 text-sm font-medium">Total Balance</span>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
        >
          {showBalance ? (
            <Eye className="w-4 h-4 text-slate-400" />
          ) : (
            <EyeOff className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="text-3xl font-bold text-white">
          {showBalance ? `$${totalUsd.toLocaleString()}` : '••••••••'}
        </div>
        
        <div className="space-y-2">
          {Object.entries(balanceData).map(([coin, data]) => (
            <div key={coin} className="flex justify-between text-sm">
              <span className="text-slate-400 uppercase">{coin}</span>
              <span className="text-white">
                {showBalance ? `${data.amount} ($${data.usd.toLocaleString()})` : '•••••'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;