'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { payments, users, deposits } from '@/lib/mockDatabase';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [depositedAmount, setDepositedAmount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [proUsers, setProUsers] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if user is admin - ONLY admin@helperai.com
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // ONLY this email can access admin panel
      if (userData.email === 'jordanmbayolovy@gmaiil.com') {
        setIsAdmin(true);
      }
    }

    // Calculate earnings
    const completedPayments = payments.filter((p) => p.paymentStatus === 'completed');
    const totalAmount = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    setTotalEarnings(totalAmount / 100); // Convert cents to dollars

    // Calculate deposits and pending
    const completedDeposits = deposits.filter((d) => d.status === 'completed' && d.type === 'withdrawal');
    const totalDeposited = completedDeposits.reduce((sum, d) => sum + d.amount, 0);
    setDepositedAmount(totalDeposited / 100);

    const pendingDeposits = deposits.filter((d) => d.status === 'pending');
    const totalPending = pendingDeposits.reduce((sum, d) => sum + d.amount, 0);
    setPendingAmount(totalPending / 100);

    // Calculate available balance
    const available = totalAmount - totalDeposited - totalPending;
    setAvailableBalance(available / 100);

    // Count Pro users
    const proCounts = users.filter((u) => u.subscriptionStatus === 'pro' && !u.isAdmin).length;
    setProUsers(proCounts);

    setTotalSubscriptions(completedPayments.length);
  }, []);

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || !bankAccount) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(withdrawAmount) * 100;
    if (amount > availableBalance * 100) {
      alert('Insufficient balance');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccessMessage(`✅ Withdrawal of $${withdrawAmount} requested! It will be processed within 2-3 business days.`);
      setWithdrawAmount('');
      setBankAccount('');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      alert('Error processing withdrawal');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You are not authorized to view the admin dashboard.</p>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        {/* Admin Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">💰 Admin Revenue Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track all Pro subscriptions and earnings</p>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Earnings */}
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold">Total Earnings</p>
                <p className="text-3xl font-bold mt-2">${totalEarnings.toFixed(2)}</p>
              </div>
              <div className="text-4xl">💵</div>
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-semibold">Available Balance</p>
                <p className="text-3xl font-bold mt-2">${availableBalance.toFixed(2)}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          {/* Already Deposited */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold">Deposited</p>
                <p className="text-3xl font-bold mt-2">${depositedAmount.toFixed(2)}</p>
              </div>
              <div className="text-4xl">🏦</div>
            </div>
          </div>

          {/* Pending Withdrawal */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-semibold">Pending</p>
                <p className="text-3xl font-bold mt-2">${pendingAmount.toFixed(2)}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          {/* Pro Subscribers */}
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-semibold">Pro Subscribers</p>
                <p className="text-3xl font-bold mt-2">{proUsers}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">💸 Withdraw Your Earnings</h2>
          
          {successMessage && (
            <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded mb-6">
              <p className="text-green-900 dark:text-green-100">{successMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Withdrawal Form */}
            <form onSubmit={handleWithdrawal} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Amount to Withdraw</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-lg">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={availableBalance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Available: ${availableBalance.toFixed(2)}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Bank Account</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="Checking ****1234"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? '⏳ Processing...' : '🚀 Request Withdrawal'}
              </button>
            </form>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <h3 className="font-bold mb-3">📋 Withdrawal Info</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Minimum: $5.00</li>
                <li>✅ Maximum: ${availableBalance.toFixed(2)}</li>
                <li>✅ Processing Time: 2-3 business days</li>
                <li>✅ Fee: None</li>
                <li>✅ Frequency: Unlimited</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">📊 Withdrawal History</h2>
          {deposits.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Bank Account</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                    <th className="px-4 py-3 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((deposit) => (
                    <tr key={deposit.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm">
                        {new Date(deposit.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium">{deposit.type === 'withdrawal' ? '💸 Withdrawal' : '💰 Deposit'}</td>
                      <td className="px-4 py-3 text-sm">{deposit.bankAccount || 'N/A'}</td>
                      <td className="px-4 py-3 text-right font-bold text-green-600 dark:text-green-400">${(deposit.amount / 100).toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            deposit.status === 'completed'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : deposit.status === 'pending'
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          }`}
                        >
                          {deposit.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <p>No withdrawals yet. Start earning with Pro subscribers!</p>
            </div>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">📝 Payment History</h2>

          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Student Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Plan</th>
                    <th className="px-4 py-3 text-right font-semibold">Amount</th>
                    <th className="px-4 py-3 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm">
                        {new Date(payment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium">{payment.userName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{payment.userEmail}</td>
                      <td className="px-4 py-3">
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-semibold">
                          {payment.planType.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-600 dark:text-green-400">
                        ${(payment.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            payment.paymentStatus === 'completed'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : payment.paymentStatus === 'pending'
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          }`}
                        >
                          {payment.paymentStatus.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <p>No payments yet. Start promoting to get first subscribers!</p>
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* User Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">👥 User Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span>Total Users</span>
                <span className="font-bold text-lg">{users.filter((u) => !u.isAdmin).length}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span>Free Plan Users</span>
                <span className="font-bold text-lg">{users.filter((u) => u.subscriptionStatus === 'free').length}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span>Pro Plan Users</span>
                <span className="font-bold text-lg text-green-600 dark:text-green-400">{proUsers}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span>Conversion Rate</span>
                <span className="font-bold text-lg">
                  {users.filter((u) => !u.isAdmin).length > 0
                    ? ((proUsers / users.filter((u) => !u.isAdmin).length) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">💹 Revenue Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span>Monthly Revenue</span>
                <span className="font-bold text-lg">${(totalEarnings / (totalSubscriptions > 0 ? 1 : 1)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span>Price per Pro</span>
                <span className="font-bold text-lg">$2.99</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span>Completed Payments</span>
                <span className="font-bold text-lg text-green-600 dark:text-green-400">
                  {payments.filter((p) => p.paymentStatus === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span>Success Rate</span>
                <span className="font-bold text-lg">
                  {payments.length > 0
                    ? (
                        (payments.filter((p) => p.paymentStatus === 'completed').length / payments.length) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold mb-4">🔧 Admin Tools</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              📥 Download Sales Report (CSV)
            </button>
            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
              📧 Send Email to Pro Users
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
              ➕ Add Test Payment (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
