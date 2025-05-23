
---
title: solana前端_0523

description: solana前端_0523
---

- ##### **检测**：在使用   window.solana   之前，需要确保用户已经安装了支持 Solana 的钱包（如 Phantom）。

  ```javascript
  if (window.solana) {
    console.log('Solana wallet detected!');
  } else {
    console.log('No Solana wallet detected. Please install Phantom or Solflare.');
  }
  ```

- ##### **连接钱包**：用户可以通过   window.solana.connect()   方法连接钱包。这将提示用户选择一个钱包并授权连接。

  ```
  async function connectWallet() {
    if (window.solana) {
      try {
        const response = await window.solana.connect();
        console.log('Connected with public key:', response.publicKey.toString());
      } catch (err) {
        console.error('Failed to connect to wallet:', err);
      }
    } else {
      console.error('No Solana wallet detected. Please install Phantom or Solflare.');
    }
  }
  
  ```

- ##### **获取钱包地址**:连接钱包后，可以通过   window.solana.publicKey   获取当前连接的钱包地址。

  ```
  async function getWalletAddress() {
    if (window.solana) {
      try {
        const publicKey = window.solana.publicKey;
        console.log('Connected wallet address:', publicKey.toString());
      } catch (err) {
        console.error('Failed to get wallet address:', err);
      }
    } else {
      console.error('No Solana wallet detected. Please install Phantom or Solflare.');
    }
  }
  
  ```

- ##### **发送交易**：可以通过   window.solana.sendTransaction()   方法发送交易

  ```
  import { Connection, Transaction, SystemProgram } from '@solana/web3.js';
  
  async function sendSol() {
    if (window.solana) {
      try {
        const connection = new Connection('https://api.devnet.solana.com');
        const fromPubkey = window.solana.publicKey;
        const toPubkey = new PublicKey('RECIPIENT_WALLET_ADDRESS');
        const lamportsToSend = 1000000; // 1 SOL = 1,000,000 lamports
  
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: lamportsToSend,
          })
        );
  
        const signature = await window.solana.sendTransaction(transaction, connection);
        console.log('Transaction signature:', signature);
      } catch (err) {
        console.error('Failed to send transaction:', err);
      }
    } else {
      console.error('No Solana wallet detected. Please install Phantom or Solflare.');
    }
  }
  
  ```

- ##### **签名消息**:可以通过   window.solana.signMessage()   方法签名消息

  ```
  async function signMessage() {
    if (window.solana) {
      try {
        const message = new TextEncoder().encode('Hello, Solana!');
        const signature = await window.solana.signMessage(message);
        console.log('Signed message:', signature);
      } catch (err) {
        console.error('Failed to sign message:', err);
      }
    } else {
      console.error('No Solana wallet detected. Please install Phantom or Solflare.');
    }
  }
  
  ```

- ##### **获取钱包余额**:可以通过   window.solana.request   方法调用   getBalance   接口获取钱包余额

  ```
  import { Connection } from '@solana/web3.js';
  
  async function getWalletBalance() {
    if (window.solana) {
      try {
        const connection = new Connection('https://api.devnet.solana.com');
        const publicKey = window.solana.publicKey;
        const balance = await connection.getBalance(publicKey);
        console.log('Wallet balance:', balance / 1e9, 'SOL');
      } catch (err) {
        console.error('Failed to get wallet balance:', err);
      }
    } else {
      console.error('No Solana wallet detected. Please install Phantom or Solflare.');
    }
  }
  
  ```

  

