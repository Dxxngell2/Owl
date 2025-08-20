import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Profile
    businessName: 'My Business',
    email: 'user@example.com',
    website: 'https://mybusiness.com',
    
    // Notifications
    emailNotifications: true,
    webhookNotifications: true,
    paymentAlerts: true,
    
    // Security
    twoFactorAuth: false,
    apiKeyExpiry: '90',
    
    // Preferences
    defaultCurrency: 'BTC',
    theme: 'dark',
    language: 'en',
    
    // Webhook
    webhookUrl: '',
    webhookSecret: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account and platform preferences</p>
        </div>
        
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Profile</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={settings.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-white font-medium">Email Notifications</div>
                <div className="text-slate-400 text-sm">Receive payment updates via email</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="w-5 h-5 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-white font-medium">Webhook Notifications</div>
                <div className="text-slate-400 text-sm">Send payment data to your webhook URL</div>
              </div>
              <input
                type="checkbox"
                checked={settings.webhookNotifications}
                onChange={(e) => handleInputChange('webhookNotifications', e.target.checked)}
                className="w-5 h-5 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-white font-medium">Payment Alerts</div>
                <div className="text-slate-400 text-sm">Get notified of successful payments</div>
              </div>
              <input
                type="checkbox"
                checked={settings.paymentAlerts}
                onChange={(e) => handleInputChange('paymentAlerts', e.target.checked)}
                className="w-5 h-5 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Security</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-white font-medium">Two-Factor Authentication</div>
                <div className="text-slate-400 text-sm">Add an extra layer of security</div>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                className="w-5 h-5 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500"
              />
            </label>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                API Key Expiry (days)
              </label>
              <select
                value={settings.apiKeyExpiry}
                onChange={(e) => handleInputChange('apiKeyExpiry', e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Palette className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Default Currency
              </label>
              <select
                value={settings.defaultCurrency}
                onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether USD (USDT)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Configuration */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Globe className="w-5 h-5 text-teal-400" />
          <h2 className="text-xl font-bold text-white">Webhook Configuration</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              placeholder="https://yourapi.com/webhook"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Webhook Secret
            </label>
            <input
              type="password"
              value={settings.webhookSecret}
              onChange={(e) => handleInputChange('webhookSecret', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
              placeholder="Your webhook secret"
            />
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
          <p className="text-slate-300 text-sm">
            <strong>Webhook Events:</strong> payment.created, payment.confirmed, payment.failed
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Your webhook URL will receive POST requests with payment data when these events occur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;