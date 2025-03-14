import { useState } from "react";
import { Button, Field, Input, Segment, Header } from "decentraland-ui";

interface TransferFormProps {
  onTransfer: (to: string, amount: string) => void;
  isLoading: boolean;
}

const TransferForm = ({ onTransfer, isLoading }: TransferFormProps) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !amount) return;
    onTransfer(to, amount);
  };

  return (
    <Segment>
      <Header>Transfer Tokens</Header>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Recipient Address">
          <Input
            type="text"
            placeholder="0x..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={isLoading}
            required
          />
        </Field>
        <Field label="Amount">
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            required
            min="0"
            step="0.000001"
          />
        </Field>
        <Button primary loading={isLoading} type="submit" disabled={!to || !amount || isLoading}>
          Transfer
        </Button>
      </form>
    </Segment>
  );
};

export default TransferForm;