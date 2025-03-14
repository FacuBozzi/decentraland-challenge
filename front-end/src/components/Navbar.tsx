import { useState } from "react";
import { Button } from "decentraland-ui";
import { Wallet } from "lucide-react";
import { connectWallet } from "@/lib/web3";
import { useToast } from "@/components/ui/use-toast";
import { formatAddress } from "@/lib/utils";

interface NavbarProps {
  account: string;
  onConnect: (data: { provider: any; signer: any; account: string }) => void;
}

const Navbar = ({ account, onConnect }: NavbarProps) => {
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
    <>
      <div className="flex justify-end items-center p-4 bg-gray-800">
        {!account ? (
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            primary
            className="!flex !flex-row items-center"
          >
            <Wallet className="!mr-2 h-4 w-4" />
            <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
          </Button>
        ) : (
          <div className="flex items-center p-4 text-white">
            <span className="text-sm mr-2">Connected:</span>
            <span className="font-mono text-sm truncate max-w-[200px]">
              {formatAddress(account)}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;