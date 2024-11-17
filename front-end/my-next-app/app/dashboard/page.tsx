'use client';

import { useState } from 'react';
import { FaMoneyBillWave, FaExchangeAlt, FaCreditCard, FaChartLine } from 'react-icons/fa';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with real data from your API
  const accountData = {
    balance: 5234.89,
    monthlySpending: 1234.56,
    savingsGoal: 10000,
    recentTransactions: [
      { id: 1, description: 'Grocery Store', amount: -82.45, date: '2024-03-15' },
      { id: 2, description: 'Salary Deposit', amount: 3000.00, date: '2024-03-14' },
      { id: 3, description: 'Restaurant', amount: -45.80, date: '2024-03-13' },
    ]
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Main Balance Card */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-sm text-gray-600">Total Balance</h2>
        <p className="text-3xl font-bold">${accountData.balance.toLocaleString()}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300">
          <FaMoneyBillWave /> Send Money
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300">
          <FaExchangeAlt /> Transfer
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300">
          <FaCreditCard /> Cards
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300">
          <FaChartLine /> Investments
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {accountData.recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="font-semibold mb-4">Financial Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Monthly Spending</p>
              <p className="text-xl font-medium">${accountData.monthlySpending.toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#7997C1] h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Savings Goal Progress</p>
              <p className="text-xl font-medium">${accountData.savingsGoal.toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#7997C1] h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
