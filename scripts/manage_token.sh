#!/bin/bash

# Victor School Token Management Script

# Configuration
TOKEN_NAME="VICTOR"
TOKEN_SYMBOL="VICTOR"
DECIMALS=9

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if Solana CLI is installed
check_solana_cli() {
    if ! command -v solana &> /dev/null; then
        echo -e "${RED}Error: Solana CLI is not installed${NC}"
        echo "Please install it using: sh -c \"\$(curl -sSfL https://release.solana.com/v1.17.0/install)\""
        exit 1
    fi
}

# Function to check if SPL CLI is installed
check_spl_cli() {
    if ! command -v spl-token &> /dev/null; then
        echo -e "${RED}Error: SPL Token CLI is not installed${NC}"
        echo "Please install it using: cargo install spl-token-cli"
        exit 1
    fi
}

# Function to create new token
create_token() {
    echo -e "${YELLOW}Creating new $TOKEN_NAME token...${NC}"
    spl-token create-token --decimals $DECIMALS
    echo -e "${GREEN}Token created successfully!${NC}"
}

# Function to mint tokens for a specific year
mint_tokens() {
    if [ -z "$1" ]; then
        echo -e "${RED}Error: Please provide the year${NC}"
        echo "Usage: $0 mint <year>"
        exit 1
    fi

    YEAR=$1
    TOKEN_ADDRESS=$2

    if [ -z "$TOKEN_ADDRESS" ]; then
        echo -e "${RED}Error: Please provide the token address${NC}"
        echo "Usage: $0 mint <year> <token_address>"
        exit 1
    fi

    echo -e "${YELLOW}Minting $YEAR tokens for year $YEAR...${NC}"
    spl-token mint $TOKEN_ADDRESS $YEAR
    echo -e "${GREEN}Tokens minted successfully!${NC}"
}

# Function to check token balance
check_balance() {
    if [ -z "$1" ]; then
        echo -e "${RED}Error: Please provide the token address${NC}"
        echo "Usage: $0 balance <token_address>"
        exit 1
    fi

    TOKEN_ADDRESS=$1
    echo -e "${YELLOW}Checking balance for token $TOKEN_ADDRESS...${NC}"
    spl-token balance $TOKEN_ADDRESS
}

# Main script
check_solana_cli
check_spl_cli

case "$1" in
    "create")
        create_token
        ;;
    "mint")
        mint_tokens "$2" "$3"
        ;;
    "balance")
        check_balance "$2"
        ;;
    *)
        echo "Usage:"
        echo "  $0 create                    - Create new token"
        echo "  $0 mint <year> <token_addr>  - Mint tokens for specific year"
        echo "  $0 balance <token_addr>      - Check token balance"
        ;;
esac 