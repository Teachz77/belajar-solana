import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`This is public key: ${keypair.publicKey.toBase58()}`);
console.log(`This is private key: ${keypair.secretKey}`);