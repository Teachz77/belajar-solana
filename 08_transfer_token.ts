import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { clusterApiUrl, Connection, PublicKey, } from '@solana/web3.js';
import 'dotenv/config'
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';

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

const amount = 5
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2)

console.log(`Sending ${amount} TCZ to ${recipientAccount}`)

const sourceAta = await getOrCreateAssociatedTokenAccount(
    connection, 
    Owner,
    tokenAccount,
    Owner.publicKey
)

// console.log(sourceAta.address)

const recipientAta = await getOrCreateAssociatedTokenAccount(
    connection,
    Owner,
    tokenAccount,
    recipientAccount
)

// console.log(recipientAta.address)

const signature = await transfer(
    connection,
    Owner,
    sourceAta.address,
    recipientAta.address,
    Owner,
    amount * MINOR_UNITS_PER_MAJOR_UNITS
)


const link = getExplorerLink('transaction', signature.toString(), 'devnet')
console.log(`Successful: ${link}`)