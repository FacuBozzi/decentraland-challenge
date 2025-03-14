import { useState } from "react";
import { ethers } from "ethers";
import WalletConnect from "@/components/WalletConnect";
import TokenBalance from "@/components/TokenBalance";
import TransferForm from "@/components/TransferForm";
import Navbar from "@/components/Navbar";
import { getTokenBalance, transferTokens } from "@/lib/web3";
import { useToast } from "@/components/ui/use-toast";
import { Container, Header, Page } from "decentraland-ui";

// This is where you'll put your deployed token contract address and ABI
const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS || '';
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

  console.log("eladdress", TOKEN_ADDRESS)

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
    <>
      <Navbar account={account} onConnect={handleWalletConnect} /> 
      <Container>
        <div className="max-w-lg mt-20 mx-auto space-y-6">
          <Header size="huge" className="text-center mb-10">
            Token Manager
            <Header.Subheader>Manage your ERC-20 tokens with ease</Header.Subheader>
          </Header>

          {!account ? (
            <div className="flex justify-center">
              <WalletConnect onConnect={handleWalletConnect} />
            </div>
          ) : (
            <>
              <TokenBalance balance={balance} isLoading={isLoading} />
              <TransferForm onTransfer={handleTransfer} isLoading={isLoading} />
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default Index;