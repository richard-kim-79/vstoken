import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const TOKEN_ADDRESS = 'BWRE6J47Jo9h9sLQebyJ1FzaAVtAcEFReNxGBY21E6kw';
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

export interface TokenInfo {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
    holders: number;
    price?: number;
    marketCap?: number;
}

export interface TokenTransaction {
    signature: string;
    timestamp: number;
    type: 'transfer' | 'mint' | 'burn';
    amount: number;
    from: string;
    to: string;
}

export const getTokenInfo = async (): Promise<TokenInfo> => {
    const mintPubkey = new PublicKey(TOKEN_ADDRESS);
    const tokenInfo = await connection.getParsedAccountInfo(mintPubkey);
    
    if (!tokenInfo.value) {
        throw new Error('Token not found');
    }

    const parsedData = tokenInfo.value.data as any;
    const supply = parsedData.parsed.info.supply;
    const decimals = parsedData.parsed.info.decimals;

    // 실제 구현에서는 더 많은 정보를 가져올 수 있습니다
    return {
        address: TOKEN_ADDRESS,
        name: 'Victor School Token',
        symbol: 'VICTOR',
        decimals,
        supply: Number(supply) / Math.pow(10, decimals),
        holders: 0, // 실제 구현에서는 토큰 홀더 수를 계산해야 합니다
    };
};

export const getTokenTransactions = async (limit: number = 10): Promise<TokenTransaction[]> => {
    const mintPubkey = new PublicKey(TOKEN_ADDRESS);
    const signatures = await connection.getSignaturesForAddress(mintPubkey, { limit });
    
    const transactions = await Promise.all(
        signatures.map(async (sig) => {
            const tx = await connection.getParsedTransaction(sig.signature);
            // 실제 구현에서는 트랜잭션 타입과 금액을 파싱해야 합니다
            return {
                signature: sig.signature,
                timestamp: sig.blockTime || 0,
                type: 'transfer' as const,
                amount: 0,
                from: '',
                to: '',
            };
        })
    );

    return transactions;
}; 