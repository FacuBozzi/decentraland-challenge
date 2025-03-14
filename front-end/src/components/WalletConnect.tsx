
// import { Button } from "@/components/ui/button";
import { Button } from "decentraland-ui"
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
      className="!hover:bg-red-700 !flex !flex-row transition-all duration-300 shadow-lg"
    >
      <Wallet className="!mr-2 h-5 w-5" />
      <p>
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </p>
    </Button>
  );
};

export default WalletConnect;
