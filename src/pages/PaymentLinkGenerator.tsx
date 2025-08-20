import React, { useState } from 'react';
import { Copy, QrCode, ExternalLink } from 'lucide-react';
import QRCodeGenerator from '../components/QRCodeGenerator';

const PaymentLinkGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    amountType: 'USD',
    description: '',
    currency: 'BTC'
  });
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [linkId, setLinkId] = useState<string | null>(null);

  const currencies = [
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
    { code: 'USDT', name: 'Tether USD' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(7);
    const link = `${window.location.origin}/payment/${id}`;
    setGeneratedLink(link);
    setLinkId(id);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Link Generator</h1>
        <p className="text-slate-400">Create secure payment links for your customers</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Payment Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Amount
              </label>
              <div className="flex rounded-xl overflow-hidden border border-slate-600">
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:bg-slate-600"
                  placeholder="0.00"
                  required
                />
                <select
                  value={formData.amountType}
                  onChange={(e) => setFormData({...formData, amountType: e.target.value})}
                  className="px-4 py-3 bg-slate-600 text-white border-l border-slate-500 focus:outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="CRYPTO">Crypto</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                placeholder="Payment for services..."
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cryptocurrency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Generate Payment Link
            </button>
          </form>
        </div>

        {/* Generated Link Section */}
        <div className="space-y-6">
          {generatedLink ? (
            <>
              {/* Success Card */}
              <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Payment Link Generated!</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <p className="text-slate-300 text-sm mb-2">Payment Link:</p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={generatedLink}
                        readOnly
                        className="flex-1 px-3 py-2 bg-slate-700 text-white text-sm rounded-lg border border-slate-600"
                      />
                      <button
                        onClick={() => copyToClipboard(generatedLink)}
                        className="p-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg transition-colors duration-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(generatedLink)}
                      className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>
                    <a
                      href={generatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <QrCode className="w-5 h-5 text-teal-400" />
                  <h3 className="text-lg font-bold text-white">QR Code</h3>
                </div>
                <QRCodeGenerator value={generatedLink} />
              </div>
            </>
          ) : (
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
              <QrCode className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-400 mb-2">QR Code Preview</h3>
              <p className="text-slate-500">Fill out the form to generate a payment link and QR code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkGenerator;