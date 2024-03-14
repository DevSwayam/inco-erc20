import React from "react";
import { useState, useEffect } from "react";
import { toHexString } from "./helpers/utils";
import { useWallets } from "@privy-io/react-auth";
import factoryAbi from "./helpers/abi/factoryAbi.json";
import { encodeFunctionData } from "viem";
import { createPublicClient, http } from "viem";
import { incoTestnet } from "../../inco-testnet";
import { Button } from "./ui/button";

export default function Hero({ getInstance }) {
  const contractAddress = "0x5Bab990d9d689Cf7618359966C352362c0d5473B";
  const [tokenName, setTokenName] = useState("");
  const [isTokenDeployed, setisTokenDeployed] = useState(false);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [amountUint32, setAmountUint32] = useState(0);
  const [eamountUint32, setEamountUint32] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const { wallets, ready } = useWallets();
  let instance;
  useEffect(() => {
    async function fetchInstance() {
      instance = await getInstance();
    }
    fetchInstance();
    if (ready) {
      contractConfig();
    }
  }, [ready]);

  const handleAmountChangeUint32 = async (e) => {
    setAmountUint32(Number(e.target.value));
    if (instance === undefined) {
      instance = await getInstance();
    }
    const encrypted = instance.encrypt32(Number(e.target.value));
    setEamountUint32(toHexString(encrypted));
  };

  const contractConfig = async () => {
    const publicClient = createPublicClient({
      chain: incoTestnet,
      transport: http(),
    });
    const wallet = wallets[0];
    const addressOfSender = await wallet.address;
    setUserAddress(addressOfSender);
    console.log(userAddress);
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: factoryAbi,
      functionName: "isTokenDeployed",
      args: [addressOfSender],
    });
    console.log(data)
    setisTokenDeployed(data);
  };

  const handleDeploy = async () => {
    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthereumProvider();
      const addressOfSender = await wallet.address;
      const arg = [tokenName, tokenSymbol, "0x" + eamountUint32];
      const dataToProvide = encodeFunctionData({
        abi: factoryAbi,
        functionName: "createERC20Token",
        args: arg,
      });
      const transactionRequest = {
        from: addressOfSender,
        to: contractAddress,
        data: dataToProvide,
      };
      const transactionHash =  await provider.request({
        from: addressOfSender,
        method: "eth_sendTransaction",
        params: [transactionRequest],
      });
      setisTokenDeployed(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        {isTokenDeployed ? (
          <div className="backdrop:blur-sm h-screen flex flex-col items-center justify-center gap-2">
            <p className="text-xl">Deployed ERC20 Contract Sucessfully</p>
            <Button
              onClick={() =>
                window.open(
      `https://explorer.testnet.inco.org/address/${userAddress}`,
                  "_blank"
                )
              }
            >
              Check Explorer
            </Button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            {/* Illustration behind hero content */}
            <div
              className="absolute left-0 bottom-0 -ml-20 hidden lg:block pointer-events-none"
              aria-hidden="true"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {/* Your SVG code */}
            </div>

            <div className="relative pt-32 pb-5 md:pt-40 md:pb-16">
              {/* Section header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4" data-aos="fade-up">
                  Deploy Your Own Tokens
                </h1>
                <p
                  className="text-xl text-gray-400 mb-8"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  With this you can Deploy Your Own ERC20 Tokens below or{" "}
                  <span style={{ color: "blue" }}>connect wallet ↗</span>
                </p>

                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="fade-up"
                >
                  <form className="w-full">
                    <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                      <input
                        type="text"
                        className="md:w-3/4 appearance-none bg-transparent border border-blue-500 focus:border-blue-300 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-blue-800 placeholder-white-400"
                        placeholder="Token Name"
                        onChange={(e) => {
                          setTokenName(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        className="md:w-3/4 appearance-none bg-transparent border border-blue-500 focus:border-blue-300 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-blue-800 placeholder-white-400"
                        placeholder="Token Symbol"
                        onChange={(e) => {
                          setTokenSymbol(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        className="md:w-3/4 appearance-none bg-transparent border border-blue-500 focus:border-blue-300 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-blue-800 placeholder-white-400"
                        placeholder="Token Supply"
                        onChange={handleAmountChangeUint32}
                        value={amountUint32}
                      />
                    </div>
                    <a
                      className="btn text-white bg-blue-700 hover:bg-blue-800 border-white-700  my-3 shadow"
                      href="#0"
                      onClick={handleDeploy}
                    >
                      Deploy Tokens
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
