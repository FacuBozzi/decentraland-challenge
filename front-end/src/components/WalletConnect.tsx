
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";
import { connectWallet } from "@/lib/web3";
import { useState } from "react";

interface WalletConnectProps {
  onConnect: (data: { provider: any; signer: any; account: string }) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const walletData = await connectWallet();
      onConnect(walletData);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-lg"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnect;
