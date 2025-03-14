
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenBalanceProps {
  balance: string;
  isLoading?: boolean;
}

const TokenBalance = ({ balance, isLoading }: TokenBalanceProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/30 border border-white/20">
      <h2 className="text-sm font-medium text-gray-500 mb-2">Token Balance</h2>
      {isLoading ? (
        <Skeleton className="h-10 w-32" />
      ) : (
        <p className="text-3xl font-bold text-[#ff2d55]">{balance}</p>
      )}
    </Card>
  );
};

export default TokenBalance;
