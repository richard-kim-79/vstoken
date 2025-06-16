import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, VStack, Divider, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { getTokenInfo, getTokenTransactions } from '../services/tokenService';

const TokenExplorer: React.FC = () => {
    const [tokenInfo, setTokenInfo] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [info, txs] = await Promise.all([
                    getTokenInfo(),
                    getTokenTransactions(3)
                ]);
                setTokenInfo(info);
                setTransactions(txs);
            } catch (err) {
                setError('토큰 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Box textAlign="center" py={20}><Spinner size="xl" /></Box>;
    if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

    return (
        <VStack spacing={6} maxW="400px" mx="auto" py={10} px={2}>
            <Heading size="lg">Victor School Token (VICTOR)</Heading>
            <Text fontSize="sm" color="gray.500" wordBreak="break-all">
                {tokenInfo.address}
                <Button size="xs" ml={2} onClick={() => navigator.clipboard.writeText(tokenInfo.address)}>복사</Button>
            </Text>
            <Divider />
            <Text fontSize="xl">총 공급량: <b>{tokenInfo.supply.toLocaleString()} VICTOR</b></Text>
            <Text fontSize="md">홀더 수: <b>{tokenInfo.holders}</b></Text>
            <Divider />
            <Box w="100%">
                <Text fontWeight="bold" mb={2}>최근 거래</Text>
                {transactions.length === 0 && <Text color="gray.400">거래 내역 없음</Text>}
                {transactions.map(tx => (
                    <Box key={tx.signature} fontSize="sm" mb={1}>
                        [{new Date(tx.timestamp * 1000).toLocaleString()}] {tx.amount > 0 ? '+' : ''}{tx.amount} VICTOR
                    </Box>
                ))}
            </Box>
            <Divider />
            <Text fontSize="sm" color="gray.600" textAlign="center">
                이 페이지는 누구나 Victor School Token 거래 현황을 쉽게 확인할 수 있도록 만들어졌습니다.
            </Text>
        </VStack>
    );
};

export default TokenExplorer; 