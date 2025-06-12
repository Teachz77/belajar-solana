import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { createMint } from '@solana/spl-token';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import 'dotenv/config'

const keyPair = process.env.KEYPAIR || null;

if (!keyPair) {
    console.log('Please provide a keypair')
    console.log('❌ Failed')
    process.exit(1)
}

const connection = new Connection(clusterApiUrl('devnet'));
const Owner = getKeypairFromEnvironment('KEYPAIR');

const token = await createMint(connection,Owner,Owner.publicKey,null,5)
const link = getExplorerLink('address', token.toString(), "devnet")

console.log(`Done! Create a token: ${link}`)