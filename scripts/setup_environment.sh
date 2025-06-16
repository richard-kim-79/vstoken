#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Victor School Token development environment setup...${NC}"

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo -e "${YELLOW}Installing nvm...${NC}"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    
    # Add nvm to PATH
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
else
    echo -e "${GREEN}nvm is already installed${NC}"
fi

# Use Node.js version from .nvmrc
if [ -f .nvmrc ]; then
    echo -e "${YELLOW}Using Node.js version from .nvmrc...${NC}"
    nvm use
else
    echo -e "${RED}Error: .nvmrc file not found${NC}"
    exit 1
fi

# Check if Solana is installed
if ! command -v solana &> /dev/null; then
    echo -e "${YELLOW}Installing Solana CLI...${NC}"
    sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
    
    # Add Solana to PATH
    export PATH="/Users/$USER/.local/share/solana/install/active_release/bin:$PATH"
    echo 'export PATH="/Users/$USER/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.zshrc
else
    echo -e "${GREEN}Solana CLI is already installed${NC}"
fi

# Check if SPL Token CLI is installed
if ! command -v spl-token &> /dev/null; then
    echo -e "${YELLOW}Installing SPL Token CLI...${NC}"
    cargo install spl-token-cli
else
    echo -e "${GREEN}SPL Token CLI is already installed${NC}"
fi

# Configure Solana for Devnet
echo -e "${YELLOW}Configuring Solana for Devnet...${NC}"
solana config set --url devnet

# Create new keypair if it doesn't exist
if [ ! -f ~/.config/solana/id.json ]; then
    echo -e "${YELLOW}Creating new Solana keypair...${NC}"
    solana-keygen new --no-bip39-passphrase
else
    echo -e "${GREEN}Solana keypair already exists${NC}"
fi

# Get the public key
PUBKEY=$(solana address)
echo -e "${GREEN}Your Solana address: ${PUBKEY}${NC}"

# Request airdrop of SOL
echo -e "${YELLOW}Requesting airdrop of 2 SOL...${NC}"
solana airdrop 2

# Check balance
BALANCE=$(solana balance)
echo -e "${GREEN}Current balance: ${BALANCE}${NC}"

echo -e "${GREEN}Development environment setup completed!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Verify your balance on https://explorer.solana.com/?cluster=devnet"
echo "2. Run './scripts/manage_token.sh create' to create your token" 