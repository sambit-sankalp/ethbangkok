import React from 'react';

const TableComponent = () => {
  const columns = [
    { display: 'ID', field: 'id' },
    { display: 'Source Address', field: 'source_address' },
    { display: 'Destination Address', field: 'destination_address' },
    { display: 'From Network', field: 'from_network' },
    { display: 'To Network', field: 'to_network' },
    { display: 'From Asset', field: 'from_asset' },
    { display: 'To Asset', field: 'to_asset' },
    { display: 'Amount', field: 'amount' },
    { display: 'Slippage Tolerance', field: 'slippage_tolerance' },
    { display: 'Deadline', field: 'deadline' },
    { display: 'Max Gas Fee', field: 'max_gas_fee' },
    { display: 'Status', field: 'status' },
  ];

  const orders = [
    {
      id: '1',
      source_address: '0x1234...5678',
      destination_address: '0xabcd...ef12',
      from_network: 'Ethereum',
      to_network: 'Polygon',
      from_asset: 'ETH',
      to_asset: 'MATIC',
      amount: '10',
      slippage_tolerance: '0.5%',
      deadline: '5 mins',
      max_gas_fee: '0.02 ETH',
      status: 'Pending',
    },
    {
      id: '2',
      source_address: '0xabcd...ef12',
      destination_address: '0x1234...5678',
      from_network: 'Binance Smart Chain',
      to_network: 'Avalanche',
      from_asset: 'BNB',
      to_asset: 'AVAX',
      amount: '25',
      slippage_tolerance: '1%',
      deadline: '10 mins',
      max_gas_fee: '0.01 BNB',
      status: 'Completed',
    },
    {
      id: '3',
      source_address: '0x5678...9012',
      destination_address: '0x7890...3456',
      from_network: 'Solana',
      to_network: 'Ethereum',
      from_asset: 'SOL',
      to_asset: 'USDC',
      amount: '50',
      slippage_tolerance: '2%',
      deadline: '15 mins',
      max_gas_fee: '0.005 SOL',
      status: 'Pending',
    },
    {
      id: '4',
      source_address: '0x9abc...0123',
      destination_address: '0x123a...ef12',
      from_network: 'Avalanche',
      to_network: 'Ethereum',
      from_asset: 'AVAX',
      to_asset: 'ETH',
      amount: '5',
      slippage_tolerance: '0.3%',
      deadline: '2 mins',
      max_gas_fee: '0.03 AVAX',
      status: 'Failed',
    },
    {
      id: '5',
      source_address: '0xabc1...abc1',
      destination_address: '0x123a...1234',
      from_network: 'Polygon',
      to_network: 'Ethereum',
      from_asset: 'MATIC',
      to_asset: 'DAI',
      amount: '100',
      slippage_tolerance: '1.5%',
      deadline: '20 mins',
      max_gas_fee: '0.02 MATIC',
      status: 'Completed',
    },
  ];

  return (
    <div className="p-6 bg-[#16161a] rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-4">Transaction Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead>
            <tr className="bg-background">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient text-left border-b border-gray-700"
                >
                  {column.display}
                </th>
              ))}
              <th className="px-4 py-3 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient text-left border-b border-gray-700">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, orderIndex) => (
                <tr
                  key={orderIndex}
                  className={`transition-all ${
                    orderIndex % 2 === 0 ? 'bg-background' : 'bg-background'
                  }`}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700"
                    >
                      {order[column.field] || 'N/A'}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700">
                    <button className="px-3 py-1 bg-white text-black font-semibold rounded-lg transition-all">
                      Solve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-3 text-md text-gray-400 text-center border-b border-gray-700 bg-background"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
