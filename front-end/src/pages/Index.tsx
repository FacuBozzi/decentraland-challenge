
import { useState } from "react";
import { ethers } from "ethers";
import WalletConnect from "@/components/WalletConnect";
import TokenBalance from "@/components/TokenBalance";
import TransferForm from "@/components/TransferForm";
import { getTokenBalance, transferTokens } from "@/lib/web3";
import { useToast } from "@/components/ui/use-toast";

// This is where you'll put your deployed token contract address and ABI
const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TOKEN_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

const Index = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [contract, setContract] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleWalletConnect = async ({
    provider,
    signer,
    account,
  }: {
    provider: any;
    signer: any;
    account: string;
  }) => {
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
    setContract(tokenContract);
    setAccount(account);
    try {
      const balance = await getTokenBalance(tokenContract, account);
      setBalance(balance);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch token balance",
      });
    }
  };

  const handleTransfer = async (to: string, amount: string) => {
    if (!contract) return;
    setIsLoading(true);
    try {
      await transferTokens(contract, to, amount);
      const newBalance = await getTokenBalance(contract, account);
      setBalance(newBalance);
      toast({
        title: "Transfer Successful",
        description: "Tokens have been transferred successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Transfer Failed",
        description: error.message || "Failed to transfer tokens",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Token Manager
          </h1>
          <p className="text-gray-600">Manage your ERC-20 tokens with ease</p>
        </div>

        {!account ? (
          <div className="flex justify-center">
            <WalletConnect onConnect={handleWalletConnect} />
          </div>
        ) : (
          <>
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Connected Account</p>
              <p className="font-mono text-sm truncate">{account}</p>
            </div>
            <TokenBalance balance={balance} isLoading={isLoading} />
            <TransferForm onTransfer={handleTransfer} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
