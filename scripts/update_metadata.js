const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
const fs = require('fs');
const path = require('path');

async function updateMetadata() {
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
        // 온체인 메타데이터 읽기
        const nft = await metaplex.nfts().findByMint({ mintAddress });
        const updateArgs = {
            mintAddress,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.image,
            isMutable: true,
        };
        if (nft.creators) {
            updateArgs.creators = nft.creators;
        }
        // 메타데이터 업데이트
        const { response } = await metaplex.nfts().update(updateArgs);
        console.log('메타데이터 업데이트 성공:', response.signature);
    } catch (error) {
        console.error('메타데이터 업데이트 실패:', error);
    }
}

updateMetadata(); 