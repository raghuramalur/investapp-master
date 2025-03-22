"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    // Mock data matching dashboard statistics
    const mockTransactions = [
      // Lump sum investment - ₹4,000
      {
        id: 1,
        type: 'lump-sum',
        amount: 4000,
        date: '2024-03-10',
        status: 'completed',
        description: 'Lump-sum investment'
      },
      // Round-ups - Total ₹8,450 from 156 spends
      ...[...Array(5)].map((_, index) => ({
        id: 100 + index,
        type: 'round-up',
        amount: 45 + Math.floor(Math.random() * 30), // Random amounts between 45-75
        date: '2024-03-' + (15 - index),
        status: 'completed',
        description: 'Round-up investment'
      })),
      // Default Payments - ₹240 from 3 transactions
      {
        id: 2,
        type: 'default',
        amount: 80,
        date: '2024-03-08',
        status: 'pending',
        description: 'Default payment'
      },
      {
        id: 3,
        type: 'default',
        amount: 80,
        date: '2024-03-07',
        status: 'pending',
        description: 'Default payment'
      },
      {
        id: 4,
        type: 'default',
        amount: 80,
        date: '2024-03-06',
        status: 'pending',
        description: 'Default payment'
      },
      // More round-ups
      ...[...Array(5)].map((_, index) => ({
        id: 200 + index,
        type: 'round-up',
        amount: 45 + Math.floor(Math.random() * 30),
        date: '2024-03-0' + (5 - index),
        status: 'completed',
        description: 'Round-up investment'
      })),
    ];

    setTransactions(mockTransactions);
  }, []);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'round-up':
        return { icon: '↑', color: 'text-purple-400', bg: 'bg-purple-500' };
      case 'lump-sum':
        return { icon: '💼', color: 'text-teal-400', bg: 'bg-teal-500' };
      case 'withdrawal':
        return { icon: '↓', color: 'text-red-400', bg: 'bg-red-500' };
      case 'default':
        return { icon: '⚠️', color: 'text-yellow-400', bg: 'bg-yellow-500' };
      default:
        return { icon: '•', color: 'text-gray-400', bg: 'bg-gray-500' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'processing':
        return 'text-blue-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  const calculateTotals = () => {
    return transactions.reduce((acc, t) => {
      if (t.status === 'completed') {
        if (t.type === 'withdrawal') {
          acc.withdrawals += Math.abs(t.amount);
        } else {
          acc.investments += t.amount;
        }
      }
      if (t.type === 'default' && t.status === 'pending') {
        acc.defaults += t.amount;
      }
      return acc;
    }, { investments: 0, withdrawals: 0, defaults: 0 });
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="w-full px-6">
        <div className="h-16 flex items-center">
          <button 
            onClick={() => router.back()}
            className="text-2xl hover:text-gray-300 transition-colors duration-200"
          >
            ←
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Transactions</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1E1E1E] rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Total Invested</div>
            <div className="text-xl font-bold text-green-400">₹{totals.investments}</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Withdrawals</div>
            <div className="text-xl font-bold text-red-400">₹{totals.withdrawals}</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Defaults</div>
            <div className="text-xl font-bold text-yellow-400">₹{totals.defaults}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              filter === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
            }`}
          >
            All Transactions
          </button>
          <button
            onClick={() => setFilter('round-up')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              filter === 'round-up'
                ? 'bg-purple-500 text-white'
                : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
            }`}
          >
            Round-Ups
          </button>
          <button
            onClick={() => setFilter('lump-sum')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              filter === 'lump-sum'
                ? 'bg-purple-500 text-white'
                : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
            }`}
          >
            Lump-Sum
          </button>
          <button
            onClick={() => setFilter('default')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              filter === 'default'
                ? 'bg-purple-500 text-white'
                : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
            }`}
          >
            Defaults
          </button>
          <button
            onClick={() => setFilter('withdrawal')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              filter === 'withdrawal'
                ? 'bg-purple-500 text-white'
                : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
            }`}
          >
            Withdrawals
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => {
            const { icon, color, bg } = getTransactionIcon(transaction.type);
            const statusColor = getStatusColor(transaction.status);

            return (
              <div 
                key={transaction.id}
                className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4"
              >
                <div className={`w-12 h-12 ${bg} bg-opacity-20 rounded-full flex items-center justify-center`}>
                  <span className={`text-2xl ${color}`}>{icon}</span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium">{transaction.description}</div>
                    <div className={transaction.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'}>
                      {transaction.type === 'withdrawal' ? '-' : '+'} ₹{Math.abs(transaction.amount)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      {formatDate(transaction.date)}
                    </div>
                    <div className={`text-sm capitalize ${statusColor}`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
} 