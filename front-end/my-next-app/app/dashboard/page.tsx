'use client';

import { useState, useEffect, useRef } from 'react';
import { FaMoneyBillWave, FaExchangeAlt, FaCreditCard, FaChartLine, FaCamera } from 'react-icons/fa';
import Link from 'next/link';
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeposit, setShowDeposit] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [balance, setBalance] = useState(5234.89);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Store', amount: -82.45, date: '2024-03-15' },
    { id: 2, description: 'Salary Deposit', amount: 3000.00, date: '2024-03-14' },
    { id: 3, description: 'Restaurant', amount: -45.80, date: '2024-03-13' },
  ]);

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

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Could not access the camera. Please allow camera permissions.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const imageDataUrl = canvasRef.current.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
      
      // Stop the camera stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    }
  };

  const handleDeposit = () => {
    setShowDeposit(true);
    startCamera();
  };

  const uploadScannedImage = async (imageDataUrl: string) => {
    setIsUploading(true);
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageDataUrl }),
    });
    
    const result = await response.json();
    console.log('Upload successful:', result);
    
    setShowDeposit(false);
    setIsUploading(false);
  };

  const handleSubmitDeposit = () => {
    // Update balance
    setBalance(prevBalance => prevBalance + 859);
    
    // Add new transaction
    const newTransaction = {
      id: transactions.length + 1,
      description: 'Check Deposit',
      amount: 859.00,
      date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    };
    
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    
    // Show success message
    setShowSuccess(true);
    // Close deposit modal
    setShowDeposit(false);
    // Reset captured image
    setCapturedImage(null);
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Success Message Component
  const SuccessMessage = () => (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
      Check deposit successful! +$859
    </div>
  );

  // Modified DepositModal with simplified logic
  const DepositModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Deposit Check</h2>
        <div className="space-y-4">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {!capturedImage ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={capturedImage} 
                alt="Captured check"
                className="w-full h-full object-contain"
              />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <div className="flex gap-4">
            {!capturedImage ? (
              <button
                onClick={captureImage}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-opacity-90"
              >
                <FaCamera /> Capture Check
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    startCamera();
                  }}
                  className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-opacity-90"
                  disabled={isUploading}
                >
                  Retake
                </button>
                <button
                  onClick={handleSubmitDeposit}
                  className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-opacity-90"
                  disabled={isUploading}
                >
                  Submit Deposit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50">
      {/* Main Balance Card - Updated to use state */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-sm text-gray-600">Total Balance</h2>
        <p className="text-3xl font-bold">${balance.toLocaleString()}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button 
          onClick={handleDeposit}
          className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300"
        >
          <FaMoneyBillWave /> Deposit
        </button>
        <Link href="/transaction">
          <button className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300">
            <FaMoneyBillWave /> Transfer
          </button>
        </Link>
        <button className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300">
          <FaCreditCard /> Cards
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#7997C1] text-white p-3 rounded-lg hover:bg-transparent hover:text-[#7997C1] hover:border hover:border-[#7997C1] transition-all duration-300">
          <FaChartLine /> Investments
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions - Updated to use transactions state */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
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

      {showDeposit && <DepositModal />}
      {showSuccess && <SuccessMessage />}
    </div>
  );
}
