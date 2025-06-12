import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import {createCreateMetadataAccountV3Instruction} from '@metaplex-foundation/mpl-token-metadata'
import 'dotenv/config'

const keyPair = process.env.KEYPAIR || null;

if (!keyPair) {
    console.log('Please provide a keypair')
    console.log('❌ Failed')
    process.exit(1)
}

const connection = new Connection(clusterApiUrl('devnet'));
const Owner = getKeypairFromEnvironment('KEYPAIR');
const tokenAccount = new PublicKey('3LHo2eCwb9kV764nXUy57qPLFWoNnQzkLRCZXRZHhUkD')

const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')

const metadata = {
    name: 'Teachz',
    symbol: 'TCZ',
    uri: 'https://bloggrazie.wordpress.com/',
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
}

const metadataTokenSync = PublicKey.findProgramAddressSync(
    [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenAccount.toBuffer(),
    ], 
    TOKEN_METADATA_PROGRAM_ID
)

const metadataPDA = metadataTokenSync[0]
const transaction = new Transaction()

const addMetadataToTokenInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenAccount,
        mintAuthority: Owner.publicKey,
        payer: Owner.publicKey,
        updateAuthority: Owner.publicKey
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadata,
            isMutable: true,
        },
    }
)

transaction.add(addMetadataToTokenInstruction)

const signature = await sendAndConfirmTransaction(connection, transaction, [Owner])

let link = getExplorerLink('transaction', signature.toString(), 'devnet')
console.log(`Done! Token with metadata added: ${link}`)

link = getExplorerLink('address', tokenAccount.toString(), 'devnet')
console.log(`Look up the token again: ${link}`)