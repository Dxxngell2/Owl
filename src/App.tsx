import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import PaymentLinkGenerator from './pages/PaymentLinkGenerator';
import PaymentWidget from './pages/PaymentWidget';
import Subscriptions from './pages/Subscriptions';
import Conversions from './pages/Conversions';
import ApiKeys from './pages/ApiKeys';
import Settings from './pages/Settings';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/transactions" element={
            <Layout>
              <Transactions />
            </Layout>
          } />
          <Route path="/payment-links" element={
            <Layout>
              <PaymentLinkGenerator />
            </Layout>
          } />
          <Route path="/subscriptions" element={
            <Layout>
              <Subscriptions />
            </Layout>
          } />
          <Route path="/conversions" element={
            <Layout>
              <Conversions />
            </Layout>
          } />
          <Route path="/api-keys" element={
            <Layout>
              <ApiKeys />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <Settings />
            </Layout>
          } />
          <Route path="/payment/:id" element={<PaymentWidget />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;