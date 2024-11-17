'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { FaLock, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  address: string;
  idUpload: File | null;
  accountType: string;
  communicationPref: string;
}

export default function Onboarding() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    address: '',
    idUpload: null,
    accountType: '',
    communicationPref: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, idUpload: files[0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 && 'Step 1: Personal Information'}
          {step === 2 && 'Step 2: KYC Verification'}
          {step === 3 && 'Step 3: Account Preferences'}
        </h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <label className="block mb-2">
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
              <label className="block mb-4">
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block mb-2">
                Date of Birth
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Address
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
              <label className="block mb-4">
                ID Upload
                <input
                  type="file"
                  name="idUpload"
                  onChange={handleFileChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block mb-2">
                Account Type
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="investment">Investment</option>
                </select>
              </label>
              <label className="block mb-4">
                Communication Preferences
                <select
                  name="communicationPref"
                  value={formData.communicationPref}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="">Select Preference</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </label>
            </div>
          )}
        </form>
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded-md ml-auto"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md ml-auto"
            >
              Finish Setup
            </button>
          )}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2 text-[#7997C1]">
            <FaLock />
            <p className="text-sm text-gray-600">
              Your personal information is secured with encryption and complies with banking standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4 mt-3">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-[#7997C1]" />
              <span className="text-xs text-gray-600">SSL Secured</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaLock className="text-[#7997C1]" />
              <span className="text-xs text-gray-600">256-bit Encryption</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-[#7997C1]" />
              <span className="text-xs text-gray-600">Bank-Level Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
