import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import { useState, useEffect } from "react";
import { BrowserProvider, AbiCoder, JsonRpcProvider } from "ethers";
import { initFhevm, createInstance } from "fhevmjs";
import { toHexString } from "./components/helpers/utils";
import { usePrivy, useWallets } from "@privy-io/react-auth";

function App() {
  const wallet = useWallets();
  const [isInitialized, setIsInitialized] = useState(false);
  const init = async () => {
    await initFhevm();
  };

  const FHE_LIB_ADDRESS = "0x000000000000000000000000000000000000005d";

 const provider = new BrowserProvider(window.ethereum);

let instance;

 const createFhevmInstance = async () => {
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  // Get blockchain public key
  const ret = await provider.call({
    to: FHE_LIB_ADDRESS,
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: "0xd9d47bb001",
  });
  const decoded = AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];
  instance = await createInstance({ chainId, publicKey });
  return instance;
};


  const getInstance = async () => {
    await init();
    const instance = await createFhevmInstance();
    return instance;
  };

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
  }, []);
  if (!isInitialized) return null;

  return (
    <>
      <NavBar/>
      <Hero getInstance = {getInstance}/>
      <Footer/>
    </>
  );
}

export default App;
