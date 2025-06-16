#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if token address is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide the token address${NC}"
    echo "Usage: $0 <token_address>"
    exit 1
fi

TOKEN_ADDRESS=$1

# Create metadata directory if it doesn't exist
mkdir -p metadata

# Create metadata file
cat > metadata/token_metadata.json << EOF
{
    "name": "Victor School Token",
    "symbol": "VICTOR",
    "description": "Victor School 교육 기금 토큰",
    "image": "https://raw.githubusercontent.com/your-repo/victor-token/main/assets/logo.png",
    "external_url": "https://victorschool.com",
    "attributes": [
        {
            "trait_type": "Token Type",
            "value": "Education Fund"
        },
        {
            "trait_type": "Network",
            "value": "Solana"
        }
    ]
}
EOF

echo -e "${GREEN}Token metadata created successfully!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update the image URL in metadata/token_metadata.json"
echo "2. Update the external_url in metadata/token_metadata.json"
echo "3. Upload the metadata to Arweave or IPFS"
echo "4. Update the token metadata on-chain using the token address: $TOKEN_ADDRESS" 