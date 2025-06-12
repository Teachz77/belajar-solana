import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { clusterApiUrl, Connection, PublicKey, } from '@solana/web3.js';
import 'dotenv/config'
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

const keyPair = process.env.KEYPAIR || null;

if (!keyPair) {
    console.log('Please provide a keypair')
    console.log('❌ Failed')
    process.exit(1)
}

const connection = new Connection(clusterApiUrl('devnet'));
const Owner = getKeypairFromEnvironment('KEYPAIR');
const tokenAccount = new PublicKey('3LHo2eCwb9kV764nXUy57qPLFWoNnQzkLRCZXRZHhUkD')

const recipientAccount = new PublicKey('CW93zpZt1FVfjQNLZ5GsQrheB6fqUZMug8u1dsAQh72S')

const associateTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    Owner,
    tokenAccount,
    recipientAccount
)

console.log(`Token Account created: ${associateTokenAccount.address}`)

const link = getExplorerLink('address', associateTokenAccount.address.toString(), 'devnet')
console.log(`Look up the token again: ${link}`)