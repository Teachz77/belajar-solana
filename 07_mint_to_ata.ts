import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { clusterApiUrl, Connection, PublicKey, } from '@solana/web3.js';
import 'dotenv/config'
import { mintTo } from '@solana/spl-token';

const keyPair = process.env.KEYPAIR || null;

if (!keyPair) {
    console.log('Please provide a keypair')
    console.log('❌ Failed')
    process.exit(1)
}

const connection = new Connection(clusterApiUrl('devnet'));
const Owner = getKeypairFromEnvironment('KEYPAIR');
const tokenAccount = new PublicKey('3LHo2eCwb9kV764nXUy57qPLFWoNnQzkLRCZXRZHhUkD')

const recipientAta = new PublicKey('4KKcT97DV3ArGbHpKxongcYX2hSF92bTmSGquUwaP9AS')

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2)

const signature = await mintTo(
    connection,
    Owner,
    tokenAccount,
    recipientAta,
    Owner,
    6 * MINOR_UNITS_PER_MAJOR_UNITS
)

const link = getExplorerLink('transaction', signature.toString(), 'devnet')
console.log(`Successful: ${link}`)