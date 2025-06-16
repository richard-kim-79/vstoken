const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
const fs = require('fs');
const path = require('path');

async function createMetadata() {
    // 연결 설정
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    
    // 키페어 로드
    const keypairPath = path.join(__dirname, '..', 'victor-token-keypair.json');
    const keypairData = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'));
    const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    
    // Metaplex 인스턴스 생성 및 identity 등록
    const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));
    
    // 메타데이터 로드
    const metadataPath = path.join(__dirname, '..', 'metadata', 'token_metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    
    // 토큰 주소
    const mintAddress = new PublicKey('BWRE6J47Jo9h9sLQebyJ1FzaAVtAcEFReNxGBY21E6kw');
    
    try {
        // 메타데이터 계정 생성 (기존 mint 사용, Fungible)
        const { response } = await metaplex
            .nfts()
            .create({
                uri: metadata.image,
                name: metadata.name,
                symbol: metadata.symbol,
                sellerFeeBasisPoints: 0,
                isMutable: true,
                mintAuthority: keypair,
                updateAuthority: keypair,
                mint: mintAddress,
                tokenOwner: keypair.publicKey,
                tokenStandard: 1, // Fungible
            });
        
        console.log('메타데이터 계정 생성 성공:', response.signature);
    } catch (error) {
        console.error('메타데이터 계정 생성 실패:', error);
    }
}

createMetadata(); 