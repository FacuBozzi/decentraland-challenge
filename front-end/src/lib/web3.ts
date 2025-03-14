
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    return { provider, signer, account: accounts[0] };
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

export const getTokenBalance = async (tokenContract: any, address: string) => {
  try {
    console.log(tokenContract, address)
    const balance = await tokenContract.balanceOf(address);
    return ethers.formatUnits(balance, 0);
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw new Error('Failed to retrieve token balance. Make sure the contract address is correct.');
  }
};

export const transferTokens = async (
  tokenContract: any,
  to: string,
  amount: string
) => {
  try {
    const tx = await tokenContract.transfer(to, ethers.parseUnits(amount, 0));
    return await tx.wait();
  } catch (error) {
    console.error('Error transferring tokens:', error);
    throw error;
  }
};
