import 'dotenv/config'
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const keyPair = process.env.KEYPAIR || null;

if (!keyPair) {
    console.log('Please provide a keypair')
    console.log('❌ Failed')
    process.exit(1)
}

const connection = new Connection(clusterApiUrl('devnet'));
const sender = getKeypairFromEnvironment('KEYPAIR');
const receiverAddress = new PublicKey(
    'CW93zpZt1FVfjQNLZ5GsQrheB6fqUZMug8u1dsAQh72S'
);

const amount = 1.5;
const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiverAddress,
    lamports: amount * LAMPORTS_PER_SOL
});

transaction.add(transferInstruction);
const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log(`Tx successful, ${amount * LAMPORTS_PER_SOL} SOL sent to ${receiverAddress}`);
console.log(`✅ Transaction signature is ${signature}`);