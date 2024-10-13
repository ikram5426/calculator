"use client";
import { useState, useEffect } from "react";

// Calculator for Percentage-Based Risk
function PercentageBasedCalculator({
  title,
  accountSize,
  riskPercentage,
  stopLoss,
  setAccountSize,
  setStopLoss,
  setRiskPercentage,
}) {
  const [positionSize, setPositionSize] = useState(null);

  useEffect(() => {
    let calculatedRiskAmount = 0;

    if (accountSize && riskPercentage) {
      calculatedRiskAmount = parseFloat(
        (accountSize * (riskPercentage / 100)).toFixed(2)
      );
    }

    if (calculatedRiskAmount && stopLoss) {
      const lotSize = (calculatedRiskAmount / stopLoss / 10).toFixed(2);
      setPositionSize(lotSize);
    } else {
      setPositionSize(null);
    }
  }, [accountSize, riskPercentage, stopLoss]);

  return (
    <div className='bg-gradient-to-b from-[#FFD700] to-[#FFC300] p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-90 w-full max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4 text-center text-[#625119]'>
        {title}
      </h2>

      <div className='mb-4'>
        <label className='block text-[#534413] font-semibold mb-2'>
          Account Size ($)
        </label>
        <input
          type='number'
          value={accountSize}
          onChange={(e) => setAccountSize(e.target.value)}
          className='w-full px-4 py-2 border rounded-md text-gray-900'
          placeholder='Account size'
        />
      </div>

      {setRiskPercentage && (
        <div className='mb-4'>
          <label className='block text-[#534413] font-semibold mb-2'>
            Risk Percentage (%)
          </label>
          <input
            type='number'
            value={riskPercentage}
            onChange={(e) => setRiskPercentage(e.target.value)}
            className='w-full px-4 py-2 border rounded-md text-gray-900'
            placeholder='Risk Percentage'
          />
        </div>
      )}

      <div className='mb-4'>
        <label className='block text-[#534413] font-semibold mb-2'>
          Stop Loss (Pips)
        </label>
        <input
          type='number'
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          className='w-full px-4 py-2 border rounded-md text-gray-900'
          placeholder='Stop Loss in Pips'
        />
      </div>

      {positionSize !== null && (
        <div className='mt-4 p-4 bg-white text-[#534413] justify-between flex font-semibold rounded-md shadow-inner'>
          <p className='text-lg'>
            <strong>Position Size:</strong>
          </p>
          <p className='text-lg'>{positionSize} lots</p>
        </div>
      )}
    </div>
  );
}

// Calculator for Risk Amount-Based
function RiskAmountBasedCalculator({
  title,
  riskAmount,
  stopLoss,
  setRiskAmount,
  setStopLoss,
}) {
  const [positionSize, setPositionSize] = useState(null);

  useEffect(() => {
    let calculatedRiskAmount = parseFloat(riskAmount);

    if (calculatedRiskAmount && stopLoss) {
      const lotSize = (calculatedRiskAmount / stopLoss / 10).toFixed(2);
      setPositionSize(lotSize);
    } else {
      setPositionSize(null);
    }
  }, [riskAmount, stopLoss]);

  return (
    <div className='bg-gradient-to-b from-[#FFD700] to-[#FFC300] p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-90 w-full max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4 text-center text-[#625119]'>
        {title}
      </h2>

      {setRiskAmount && (
        <div className='mb-4'>
          <label className='block text-[#534413] font-semibold mb-2'>
            Specific Risk Amount ($)
          </label>
          <input
            type='number'
            value={riskAmount}
            onChange={(e) => setRiskAmount(e.target.value)}
            className='w-full px-4 py-2 border rounded-md text-gray-900'
            placeholder='Risk Amount'
          />
        </div>
      )}

      <div className='mb-4'>
        <label className='block text-[#534413] font-semibold mb-2'>
          Stop Loss (Pips)
        </label>
        <input
          type='number'
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          className='w-full px-4 py-2 border rounded-md text-gray-900'
          placeholder='Stop Loss in Pips'
        />
      </div>

      {positionSize !== null && (
        <div className='mt-4 p-4 bg-white text-[#534413] justify-between flex font-semibold rounded-md shadow-inner'>
          <p className='text-lg'>
            <strong>Position Size:</strong>
          </p>
          <p className='text-lg'>{positionSize} lots</p>
        </div>
      )}
    </div>
  );
}

// Main Home Component
export default function Home() {
  const [accountSize1, setAccountSize1] = useState("");
  const [riskPercentage, setRiskPercentage] = useState("");
  const [stopLoss1, setStopLoss1] = useState("");

  const [riskAmount, setRiskAmount] = useState("");
  const [stopLoss2, setStopLoss2] = useState("");

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4'>
      <div className='w-full max-w-6xl text-center'>
        {/* Single Heading for Both Calculators */}
        <h1 className='md:text-4xl text-2xl font-bold  mb-8 md:mb-20 text-[#0f0d08]'>
          Position Size Calculator
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Calculator 1 - Based on Risk Percentage */}
          <PercentageBasedCalculator
            title='Percentage Based'
            accountSize={accountSize1}
            stopLoss={stopLoss1}
            riskPercentage={riskPercentage}
            setAccountSize={setAccountSize1}
            setStopLoss={setStopLoss1}
            setRiskPercentage={setRiskPercentage}
          />

          {/* Calculator 2 - Based on Risk Amount */}
          <RiskAmountBasedCalculator
            title='Risk Amount Based'
            stopLoss={stopLoss2}
            riskAmount={riskAmount}
            setStopLoss={setStopLoss2}
            setRiskAmount={setRiskAmount}
          />
        </div>
      </div>
    </div>
  );
}
