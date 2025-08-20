import React, { useState } from 'react';
import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
}

const ApiKeys: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read']);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'owl_live_sk_1234567890abcdef1234567890abcdef',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      permissions: ['read', 'write']
    },
    {
      id: '2',
      name: 'Development API',
      key: 'owl_test_sk_abcdef1234567890abcdef1234567890',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      permissions: ['read']
    }
  ]);

  const permissions = [
    { id: 'read', label: 'Read payments', description: 'View payment status and details' },
    { id: 'write', label: 'Create payments', description: 'Create new payment links' },
    { id: 'webhook', label: 'Manage webhooks', description: 'Create and manage webhook endpoints' }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `owl_live_sk_${Math.random().toString(36).substring(2, 34)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: selectedPermissions
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setSelectedPermissions(['read']);
    setShowCreateForm(false);
  };

  const deleteKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(20) + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">API Keys</h1>
          <p className="text-slate-400 mt-1">Manage your API keys for secure integration</p>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create API Key</span>
        </button>
      </div>

      {/* Create API Key Form */}
      {showCreateForm && (
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Create New API Key</h2>
          
          <form onSubmit={handleCreateKey} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:bg-slate-600 transition-colors duration-200"
                placeholder="e.g., Production API, Development API"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                Permissions
              </label>
              <div className="space-y-3">
                {permissions.map(permission => (
                  <label key={permission.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPermissions([...selectedPermissions, permission.id]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission.id));
                        }
                      }}
                      className="mt-1 w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500"
                    />
                    <div>
                      <div className="text-white font-medium">{permission.label}</div>
                      <div className="text-slate-400 text-sm">{permission.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Create Key
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-teal-400 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* API Keys List */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Your API Keys</h2>
        
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-teal-400" />
                  <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                </div>
                <button
                  onClick={() => deleteKey(apiKey.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    readOnly
                    className="flex-1 px-3 py-2 bg-slate-800 text-white text-sm font-mono rounded-lg border border-slate-600"
                  />
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="p-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200"
                  >
                    {visibleKeys.has(apiKey.id) ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="p-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg transition-colors duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {apiKey.permissions.map(permission => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-lg border border-teal-500/30"
                    >
                      {permission}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-slate-400">
                  <span>Created: {apiKey.created}</span>
                  <span>Last used: {apiKey.lastUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;