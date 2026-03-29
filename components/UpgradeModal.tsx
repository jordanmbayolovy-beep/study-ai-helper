'use client';

import { useState } from 'react';

interface UpgradeModalProps {
  onClose: () => void;
}

export default function UpgradeModal({ onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay' | 'googlepay' | 'alipay' | 'wechat'>('card');
  const [currency, setCurrency] = useState<'usd' | 'cad' | 'eur' | 'gbp' | 'jpy' | 'cny' | 'zar'>('usd');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFreeTrial, setShowFreeTrial] = useState(true);

  const prices: { [key: string]: number } = {
    usd: 299,
    cad: 200,
    eur: 269,
    gbp: 239,
    jpy: 30000,
    cny: 1999,
    zar: 5500,
  };

  const currencySymbols: { [key: string]: string } = {
    usd: '$',
    cad: '$',
    eur: '€',
    gbp: '£',
    jpy: '¥',
    cny: '¥',
    zar: 'R',
  };

  const getCountryFromCurrency = (cur: string) => {
    const map: { [key: string]: string } = {
      usd: '🇺🇸 USA',
      cad: '🇨🇦 Canada',
      eur: '🇪🇺 Europe',
      gbp: '🇬🇧 UK',
      jpy: '🇯🇵 Japan',
      cny: '🇨🇳 China',
      zar: '🇿🇦 South Africa',
    };
    return map[cur];
  };

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payment/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: 'pro',
          paymentMethod,
          currency,
          amount: prices[currency],
        }),
      });

      const data = await response.json();
      if (data.success) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.subscriptionStatus = 'pro';
        localStorage.setItem('user', JSON.stringify(user));
        alert(`🎉 Welcome to Pro! You've been charged in ${currencySymbols[currency]}${(prices[currency] / 100).toFixed(2)}`);
        onClose();
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">🚀 Upgrade to Pro</h2>
              <p className="text-blue-100 mt-1">Unlimited access to all features</p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl hover:text-blue-200 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Free Trial Offer */}
          {showFreeTrial && (
            <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-lg">
              <p className="font-semibold text-green-900 dark:text-green-100">✨ Limited Time: 7 Days Free Trial!</p>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">Try all Pro features free for a week.</p>
            </div>
          )}

          {/* Plans Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Free Plan */}
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">📋 Free Plan</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ 20 questions/day</li>
                <li>✓ 15 notes/day</li>
                <li>✓ 20 math problems/day</li>
                <li>✓ Basic chatbot</li>
              </ul>
              <p className="text-2xl font-bold mt-4">$0</p>
              <p className="text-xs text-gray-500 mt-2">Forever free</p>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-indigo-500 dark:border-indigo-400 rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900 bg-opacity-30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">⭐ Pro Plan</h3>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <ul className="space-y-2 text-sm">
                <li>✓ ∞ Unlimited questions</li>
                <li>✓ ∞ Unlimited notes</li>
                <li>✓ ✓ Priority support</li>
                <li>✓ ✓ Ad-free experience</li>
              </ul>
              <p className="text-2xl font-bold mt-4">
                {currencySymbols[currency]}{(prices[currency] / 100).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-2">/month - Billed monthly</p>
            </div>
          </div>

          {/* Currency Selector */}
          <div>
            <h4 className="font-semibold mb-3">🌍 Select Your Region</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { code: 'usd', label: '🇺🇸 USA', currency: 'USD' },
                { code: 'eur', label: '🇪🇺 Europe', currency: 'EUR' },
                { code: 'gbp', label: '🇬🇧 UK', currency: 'GBP' },
                { code: 'jpy', label: '🇯🇵 Japan', currency: 'JPY' },
                { code: 'cny', label: '🇨🇳 China', currency: 'CNY' },
              ].map((region) => (
                <button
                  key={region.code}
                  onClick={() => setCurrency(region.code as any)}
                  className={`p-2 rounded-lg border-2 transition text-center text-sm ${
                    currency === region.code
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  <div>{region.label}</div>
                  <div className="font-bold">{currencySymbols[region.code]}{(prices[region.code] / 100).toFixed(0)}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              💡 Prices adjusted for your region. All currencies supported globally via Stripe.
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="font-semibold mb-3">💳 Payment Methods (Global)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              ✅ Support for 150+ countries | All major cards accepted
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'card', label: '💳 Credit/Debit Card', desc: 'Visa, Mastercard, Amex' },
                { id: 'paypal', label: '🅿️ PayPal', desc: 'Available worldwide' },
                { id: 'applepay', label: '🍎 Apple Pay', desc: 'Apple devices' },
                { id: 'googlepay', label: '🔵 Google Pay', desc: 'Android devices' },
                { id: 'alipay', label: '🇨🇳 Alipay', desc: 'Asia payment' },
                { id: 'wechat', label: '📱 WeChat Pay', desc: 'China payment' },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 rounded-lg border-2 transition text-left ${
                    paymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  <div className="font-semibold text-sm">{method.label}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{method.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Features Highlight */}
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">✨ What's Included:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>✓ Faster responses</div>
              <div>✓ Advanced tools</div>
              <div>✓ All subjects</div>
              <div>✓ Priority chat</div>
            </div>
          </div>

          {/* Global Payment Support */}
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">🌐 Global Payment Support</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div>✅ 150+ countries supported</div>
              <div>✅ All major credit cards</div>
              <div>✅ Visa, Mastercard, Amex</div>
              <div>✅ Regional payment methods</div>
              <div>✅ Multiple currencies</div>
              <div>✅ Secure Stripe payments</div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
              🔒 All payments processed securely via Stripe. Your data is safe and encrypted.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Maybe Later
            </button>
            <button
              onClick={handleUpgrade}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {isProcessing ? '⏳ Processing...' : '✅ Upgrade Now'}
            </button>
          </div>

          {/* Money-back guarantee */}
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            30-day money-back guarantee • No questions asked
          </p>
        </div>
      </div>
    </div>
  );
}
