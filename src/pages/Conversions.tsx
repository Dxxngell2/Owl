import React, { useState, useEffect } from 'react';
import { ArrowUpDown, RefreshCw, TrendingUp, TrendingDown, DollarSign, Bitcoin, Zap } from 'lucide-react';

interface ConversionRate {
  from: string;
  to: string;
  rate: number;
  change24h: number;
  lastUpdated: string;
}

interface ConversionHistory {
  id: string;
  from: string;
  to: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
}

const Conversions: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('0.00');
  const [isLoading, setIsLoading] = useState(false);

  const currencies = [
    { code: 'BTC', name: 'Bitcoin', icon: Bitcoin },
    { code: 'ETH', name: 'Ethereum', icon: Zap },
    { code: 'USDT', name: 'Tether USD', icon: DollarSign },
    { code: 'USD', name: 'US Dollar', icon: DollarSign }
  ];

  const conversionRates: ConversionRate[] = [
    { from: 'BTC', to: 'USD', rate: 52340.50, change24h: 2.45, lastUpdated: '2024-01-20 14:32' },
    { from: 'ETH', to: 'USD', rate: 2890.75, change24h: -1.23, lastUpdated: '2024-01-20 14:32' },
    { from: 'USDT', to: 'USD', rate: 1.00, change24h: 0.01, lastUpdated: '2024-01-20 14:32' },
    { from: 'BTC', to: 'ETH', rate: 18.12, change24h: 3.67, lastUpdated: '2024-01-20 14:32' }
  ];

  const conversionHistory: ConversionHistory[] = [
    {
      id: '1',
      from: 'BTC',
      to: 'USD',
      fromAmount: 0.5,
      toAmount: 26170.25,
      rate: 52340.50,
      fee: 52.34,
      status: 'completed',
      timestamp: '2024-01-20 13:45'
    },
    {
      id: '2',
      from: 'ETH',
      to: 'USDT',
      fromAmount: 2.5,
      toAmount: 7226.88,
      rate: 2890.75,
      fee: 14.45,
      status: 'completed',
      timestamp: '2024-01-19 16:20'
    },
    {
      id: '3',
      from: 'BTC',
      to: 'ETH',
      fromAmount: 0.25,
      toAmount: 4.53,
      rate: 18.12,
      fee: 0.009,
      status: 'pending',
      timestamp: '2024-01-19 11:15'
    }
  ];

  const getCurrentRate = (from: string, to: string): number => {
    const rate = conversionRates.find(r => r.from === from && r.to === to);
    if (rate) return rate.rate;
    
    // Try reverse rate
    const reverseRate = conversionRates.find(r => r.from === to && r.to === from);
    if (reverseRate) return 1 / reverseRate.rate;
    
    return 0;
  };

  const calculateConversion = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setConvertedAmount('0.00');
      return;
    }

    const rate = getCurrentRate(fromCurrency, toCurrency);
    const result = parseFloat(amount) * rate;
    setConvertedAmount(result.toFixed(8));
  };

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // In real implementation, this would trigger the actual conversion
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const totalConverted = conversionHistory
    .filter(h => h.status === 'completed')
    .reduce((sum, h) => sum + h.toAmount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Coin Conversions</h1>
          <p className="text-slate-400 mt-1">Convert between cryptocurrencies and fiat currencies</p>
        </div>
        
        <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
          <RefreshCw className="w-5 h-5" />
          <span>Refresh Rates</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Converted</span>
            <ArrowUpDown className="w-5 h-5 text-teal-400" />
          </div>
          <p className="text-2xl font-bold text-white">${totalConverted.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">+8.5% this month</p>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">BTC/USD Rate</span>
            <Bitcoin className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white">$52,340.50</p>
          <div className="flex items-center space-x-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <p className="text-green-400 text-sm">+2.45%</p>
          </div>
        </div>

        <div className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">ETH/USD Rate</span>
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white">$2,890.75</p>
          <div className="flex items-center space-x-1 mt-1">
            <TrendingDown className="w-3 h-3 text-red-400" />
            <p className="text-red-400 text-sm">-1.23%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Conversion Calculator */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Currency Converter</h2>
          
          <div className="space-y-6">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">From</label>
              <div className="flex rounded-xl overflow-hidden border border-slate-600">
                <input
                  type="number"
                  step="0.00000001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:bg-slate-600"
                  placeholder="0.00"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="px-4 py-3 bg-slate-600 text-white border-l border-slate-500 focus:outline-none min-w-[100px]"
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSwapCurrencies}
                className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-all duration-200 hover:scale-110"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">To</label>
              <div className="flex rounded-xl overflow-hidden border border-slate-600">
                <input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="flex-1 px-4 py-3 bg-slate-700 text-white"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="px-4 py-3 bg-slate-600 text-white border-l border-slate-500 focus:outline-none min-w-[100px]"
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Exchange Rate</span>
                <span className="text-white font-semibold">
                  1 {fromCurrency} = {getCurrentRate(fromCurrency, toCurrency).toLocaleString()} {toCurrency}
                </span>
              </div>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={!amount || isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <ArrowUpDown className="w-5 h-5" />
                  <span>Convert Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Current Rates */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Current Rates</h2>
          
          <div className="space-y-4">
            {conversionRates.map((rate, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">
                    {rate.from}/{rate.to}
                  </span>
                  <div className="flex items-center space-x-1">
                    {rate.change24h >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      rate.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">
                    {rate.rate.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-xs">
                    Updated: {rate.lastUpdated}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion History */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Conversion History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">From</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">To</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Rate</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Fee</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Status</th>
                <th className="text-left py-4 px-2 text-slate-400 font-medium text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {conversionHistory.map((conversion) => (
                <tr key={conversion.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors duration-200">
                  <td className="py-4 px-2">
                    <div className="space-y-1">
                      <div className="text-white font-semibold">
                        {conversion.fromAmount} {conversion.from}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="space-y-1">
                      <div className="text-white font-semibold">
                        {conversion.toAmount.toLocaleString()} {conversion.to}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-slate-300">
                    {conversion.rate.toLocaleString()}
                  </td>
                  <td className="py-4 px-2 text-slate-300">
                    {conversion.fee} {conversion.from}
                  </td>
                  <td className="py-4 px-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(conversion.status)}`}>
                      {conversion.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-slate-300">
                    {conversion.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Conversions;