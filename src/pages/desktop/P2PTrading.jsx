import React, { useState } from 'react';
import { CreditCard, Globe } from 'lucide-react';
import PurchaseCryptoPage from '../mobile/PurchaseCryptoPage'
import P2PGuide from '../../components/P2PGuide';
import FAQ from '../../components/FAQ';

const offers = [
  {
    merchant: 'Russian_Change',
    price: 0.979,
    quantity: '1,000.00 USDT',
    limit: '100.00–979.00 USD',
    paymentMethods: ['card', 'crypto'],
  },
  {
    merchant: 'Russian_Change',
    price: 0.997,
    quantity: '1,000.00 USDT',
    limit: '130.00–1,000.00 USD',
    paymentMethods: ['card', 'crypto'],
  },
  {
    merchant: 'RussiaBank',
    price: 0.998,
    quantity: '250.00 USDT',
    limit: '20.00–49.00 USD',
    paymentMethods: ['card', 'crypto'],
  },
  {
    merchant: 'RussiaBank',
    price: 0.998,
    quantity: '3,500.00 USDT',
    limit: '50.00–800.00 USD',
    paymentMethods: ['card', 'crypto'],
  },
];

const P2PTrading = () => {
  const [activeTab, setActiveTab] = useState('p2p');

  return (
    <div className='max-w-7xl mx-auto'>
        <div className="bg-black text-white p-4">
          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-700 mb-4">
            <button
              className={`pb-2 text-lg ${activeTab === 'p2p' ? 'border-b-2 border-lime-500 text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('p2p')}
            >
              P2P Trading
            </button>
            <button
              className={`pb-2 text-lg ${activeTab === 'third' ? 'border-b-2 border-lime-500 text-white' : 'text-gray-400'}`}
              onClick={() => setActiveTab('third')}
            >
              Third-party
            </button>
          </div>
    
          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select className="bg-zinc-900 text-white py-2 px-4 rounded">
              <option value="USDT">USDT</option>
            </select>
            <input
              type="number"
              placeholder="0.00"
              className="bg-zinc-900 text-white py-2 px-4 rounded w-full"
            />
            <select className="bg-zinc-900 text-white py-2 px-4 rounded">
              <option value="all">All Payment Methods</option>
            </select>
          </div>
    
          {/* Table Headers */}
          {activeTab === 'p2p' && (
            <div className="hidden md:grid grid-cols-6 text-sm text-gray-400 mb-2 px-2">
              <span className="col-span-2">Merchant</span>
              <span>Price</span>
              <span>Quantity / Limit</span>
              <span>Payment method</span>
              <span className="text-right">Action</span>
            </div>
          )}
    
          {/* Offer Cards */}
          {activeTab === 'p2p' ? (
            <div className="space-y-4">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="border-b border-b-zinc-800 rounded-lg p-4 md:grid md:grid-cols-6 gap-2 items-center"
                >
                  <div className="md:col-span-2 font-semibold">
                    {offer.merchant}
                    <div className="text-xs text-gray-400">0 Orders | 0.00% Completion Rate</div>
                  </div>
                  <div className="text-lime-400 font-bold">{offer.price.toFixed(3)} USD</div>
                  <div>
                    <div>{offer.quantity}</div>
                    <div className="text-xs text-gray-400">{offer.limit}</div>
                  </div>
                  <div className="flex space-x-2">
                    {offer.paymentMethods.includes('card') && <CreditCard size={18} />}
                    {offer.paymentMethods.includes('crypto') && <Globe size={18} />}
                  </div>
                  <div className="text-right">
                    <button className="bg-lime-500 hover:bg-lime-600 text-black px-4 py-1 rounded">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
                <PurchaseCryptoPage />
            </>
          )}
        </div>
        <P2PGuide />
        <FAQ />
    </div>
  );
};

export default P2PTrading;
