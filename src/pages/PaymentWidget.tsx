import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Clock, Copy, Zap } from 'lucide-react';
import QRCodeGenerator from '../components/QRCodeGenerator';

type PaymentStatus = 'waiting' | 'confirmed' | 'failed';

const PaymentWidget: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<PaymentStatus>('waiting');
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Mock payment data
  const paymentData = {
    merchantName: 'Digital Store',
    amount: '0.0235',
    currency: 'BTC',
    usdAmount: 1250.00,
    description: 'Premium subscription',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate payment confirmation after 30 seconds
    const confirmationTimer = setTimeout(() => {
      if (status === 'waiting') {
        setStatus('confirmed');
      }
    }, 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(confirmationTimer);
    };
  }, [status]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'waiting':
        return {
          icon: Clock,
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          border: 'border-yellow-400/20',
          title: 'Waiting for Payment',
          subtitle: `Send exactly ${paymentData.amount} ${paymentData.currency} to complete payment`
        };
      case 'confirmed':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bg: 'bg-green-400/10',
          border: 'border-green-400/20',
          title: 'Payment Confirmed!',
          subtitle: 'Your payment has been successfully received'
        };
      case 'failed':
        return {
          icon: Clock,
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/20',
          title: 'Payment Expired',
          subtitle: 'Please generate a new payment link'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Owl</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{paymentData.merchantName}</h1>
          <p className="text-slate-400">{paymentData.description}</p>
        </div>

        {/* Amount */}
        <div className="text-center mb-8 p-6 bg-slate-700/30 rounded-xl border border-slate-600/50">
          <p className="text-slate-400 text-sm mb-1">Amount Due</p>
          <div className="text-3xl font-bold text-white mb-1">
            {paymentData.amount} {paymentData.currency}
          </div>
          <p className="text-slate-400">${paymentData.usdAmount.toLocaleString()}</p>
        </div>

        {/* Status */}
        <div className={`flex items-center justify-center space-x-3 p-4 rounded-xl border mb-6 ${statusConfig.bg} ${statusConfig.border}`}>
          <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
          <div>
            <p className={`font-semibold ${statusConfig.color}`}>{statusConfig.title}</p>
            <p className="text-slate-400 text-sm">{statusConfig.subtitle}</p>
          </div>
        </div>

        {status === 'waiting' && (
          <>
            {/* Timer */}
            <div className="text-center mb-6">
              <p className="text-slate-400 text-sm mb-2">Time remaining</p>
              <div className="text-2xl font-bold text-white font-mono">{formatTime(timeLeft)}</div>
            </div>

            {/* QR Code */}
            <div className="mb-6">
              <QRCodeGenerator value={paymentData.address} size={250} />
            </div>

            {/* Wallet Address */}
            <div className="mb-6">
              <p className="text-slate-400 text-sm mb-2">Or send to wallet address:</p>
              <div className="flex items-center space-x-2 p-3 bg-slate-700 rounded-xl border border-slate-600">
                <input
                  type="text"
                  value={paymentData.address}
                  readOnly
                  className="flex-1 bg-transparent text-white text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(paymentData.address)}
                  className="p-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg transition-colors duration-200"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Animation */}
            <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-teal-400 to-purple-500 h-2 rounded-full transition-all duration-1000 animate-pulse"
                style={{ width: `${((15 * 60 - timeLeft) / (15 * 60)) * 100}%` }}
              ></div>
            </div>
          </>
        )}

        {status === 'confirmed' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <p className="text-slate-300">You can now close this page</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Generate New Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentWidget;