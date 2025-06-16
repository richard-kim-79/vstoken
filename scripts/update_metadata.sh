#!/bin/bash

# 메타데이터 업데이트 스크립트
TOKEN_ADDRESS="BWRE6J47Jo9h9sLQebyJ1FzaAVtAcEFReNxGBY21E6kw"
METADATA_FILE="../metadata/token_metadata.json"

# 메타데이터 업데이트
metaplex update-metadata \
  --keypair victor-token-keypair.json \
  --mint $TOKEN_ADDRESS \
  --metadata-file $METADATA_FILE 