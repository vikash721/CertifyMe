<div className="grid grid-cols-1 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 flex items-center transition-colors"
                    onClick={() => handleCryptoSelect("bitcoin")}
                  >
                    <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center mr-4">
                      <Bitcoin className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">Bitcoin (BTC)</h3>
                      <div className="flex items-center">
                        <p className="text-sm text-slate-400">1 BTC ≈ $43,250.00</p>
                        <span className="text-xs text-green-400 ml-2">+2.4%</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 flex items-center transition-colors"
                    onClick={() => handleCryptoSelect("ethereum")}
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <Ethereum className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">Ethereum (ETH)</h3>
                      <div className="flex items-center">
                        <p className="text-sm text-slate-400">1 ETH ≈ $2,350.00</p>
                        <span className="text-xs text-green-400 ml-2">+1.8%</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-slate-700 hover:bg-slate-600 rounded-lg p-4 flex items-center transition-colors"
                    onClick={() => handleCryptoSelect("usdc")}
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center mr-4">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">USD Coin (USDC)</h3>
                      <div className="flex items-center">
                        <p className="text-sm text-slate-400">1 USDC ≈ $1.00</p>
                        <span className="text-xs text-slate-400 ml-2">Stablecoin</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </motion.button>

                  <div className="relative flex items-center justify-center my-2">
                    <div className="border-t border-slate-700 w-full"></div>
                    <div className="absolute bg-slate-800 px-2 text-xs text-slate-400">MORE CRYPTOCURRENCIES</div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex flex-col items-center justify-center transition-colors"
                      onClick={() => handleCryptoSelect("litecoin")}
                    >
                      <SiLitecoin className="h-6 w-6 text-slate-300 mb-1" />
                      <span className="text-xs">Litecoin</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex flex-col items-center justify-center transition-colors"
                      onClick={() => handleCryptoSelect("ripple")}
                    >
                      <SiRipple className="h-6 w-6 text-blue-400 mb-1" />
                      <span className="text-xs">XRP</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex flex-col items-center justify-center transition-colors"
                      onClick={() => handleCryptoSelect("other")}
                    >
                      
                      <span className="text-xs">Others</span>
                    </motion.button>
                  </div>
                </div>











{step === 3 && paymentMethod === "crypto" && (
    <div className="space-y-4">
        <div className="bg-slate-900/50 rounded-lg p-4 flex justify-between items-center">
            <div className="text-sm">Amount Due:</div>
            <div className="text-lg font-bold">{currency} {amount.toFixed(2)}</div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 flex justify-between items-center">
            <div className="text-sm">Crypto Amount:</div>
            <div className="text-lg font-bold">
                {cryptoType === "bitcoin" && "0.0046 BTC"}
                {cryptoType === "ethereum" && "0.0847 ETH"}
                {cryptoType === "usdc" && "199.00 USDC"}
                {cryptoType === "litecoin" && "1.5842 LTC"}
                {cryptoType === "ripple" && "352.21 XRP"}
                {cryptoType === "other" && "Varies by selection"}
            </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 flex flex-col items-center">
            <div className="text-sm text-slate-300 mb-3">Scan QR code or copy wallet address</div>

            {/* QR Code Placeholder */}
            <div className="h-48 w-48 bg-white p-3 rounded-lg mb-4">
                <div className="h-full w-full bg-slate-900 rounded-sm grid grid-cols-5 grid-rows-5 gap-1 p-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                    ))}
                </div>
            </div>

            <div className="w-full bg-slate-800 rounded-lg p-3 flex items-center justify-between mb-2">
                <div className="font-mono text-sm truncate pr-2">
                    {cryptoType === "bitcoin" && "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"}
                    {cryptoType === "ethereum" && "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
                    {cryptoType === "usdc" && "0x8fD175R7637b2b4aec24693BDf4c9f204ee4a0Ea"}
                    {cryptoType === "litecoin" && "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"}
                    {cryptoType === "ripple" && "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh"}
                    {cryptoType === "other" && "Select a cryptocurrency first"}
                </div>
                <button className="bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded-md transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>

            <div className="text-xs text-slate-400 text-center">
                Send exactly the amount shown above to this address.<br />
                The transaction may take 10-30 minutes to confirm.
            </div>
        </div>

        {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 rounded-lg p-3 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
            </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 mt-2">
            <Key className="h-3 w-3" />
            <span>Transactions are secured by blockchain technology</span>
        </div>

        <div className="flex justify-between mt-4">
            <button
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                onClick={() => setStep(1)}
            >
                Cancel
            </button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${isProcessing ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                onClick={handleProcessPayment}
                disabled={isProcessing}
            >
                {isProcessing ? (
                    <>
                        <Loader className="animate-spin h-4 w-4 mr-2" />
                        Verifying...
                    </>
                ) : (
                    <>
                        I've Sent the Payment
                    </>
                )}
            </motion.button>
        </div>
    </div>
)}