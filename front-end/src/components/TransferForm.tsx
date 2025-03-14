
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

interface TransferFormProps {
  onTransfer: (to: string, amount: string) => Promise<void>;
  isLoading?: boolean;
}

const TransferForm = ({ onTransfer, isLoading }: TransferFormProps) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !amount) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please fill in all fields",
      });
      return;
    }
    try {
      await onTransfer(to, amount);
      setTo("");
      setAmount("");
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/30 border border-white/20">
      <h2 className="text-lg font-semibold mb-4">Transfer Tokens</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Recipient Address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-white/50"
          />
        </div>
        <div>
          <Input
            type="number"
            step="1"
            min="0"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white/50"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              Transfer <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default TransferForm;
