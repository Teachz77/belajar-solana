import 'dotenv/config'
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const keyPair = process.env.KEYPAIR || null

if (!keyPair) {
    console.log('Please provide a keypair')
    console.log('❌ Failed')
    process.exit(1)
}

const connection = new Connection(clusterApiUrl('devnet'))
const address = getKeypairFromEnvironment('KEYPAIR')

const balance = await connection.getBalance(address.publicKey)
const solBalance = balance / LAMPORTS_PER_SOL

console.log(`The balance of ${address.publicKey} is ${solBalance} SOL`)
console.log('✅ Done')
