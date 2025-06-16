# Victor School Token (VICTOR)

Solana 기반 SPL 토큰 발행, 관리, 온체인 투명성, 초보자 친화적 Explorer 웹사이트, GitHub Pages 배포까지 한 번에!

---

## 1. 프로젝트 개요
- **목표:** Solana 기반 SPL 토큰(VICTOR) 연도별 발행, 온체인 기록 투명성, 누구나 쉽게 확인 가능한 Explorer 제공
- **운영:** 관리자 PC에서 CLI로 토큰 발행/관리, 웹사이트에서 실시간 정보 확인

## 2. 파일/폴더 구조
```
├── README.md
├── package.json
├── config.json                # 토큰/네트워크 설정
├── scripts/
│   ├── manage_token.sh        # 토큰 발행/전송/잔액조회 등
│   ├── setup_environment.sh   # 환경설정 자동화
│   └── create_token_metadata.sh # 메타데이터 생성(실험적)
├── src/
│   ├── App.tsx                # React Explorer 메인
│   └── ...
```

## 3. 환경 설정 및 CLI 도구 설치
- Homebrew, Rust, Solana CLI, SPL Token CLI, Node.js, npm, Metaplex CLI 설치
- `scripts/setup_environment.sh`로 자동 설치 지원
- Solana Devnet 계정/키페어 생성, airdrop으로 SOL 확보

## 4. 토큰 발행 및 테스트
- `scripts/manage_token.sh`로 VICTOR 토큰 생성, 연도별 발행, 전송, 잔액조회 등 가능
- Solana Explorer에서 트랜잭션 확인

## 5. 메타데이터 온체인 등록(실험적)
- Metaplex CLI/SDK로 SPL 토큰에 메타데이터 계정 생성 시도(공식 지원 X, NFT/SFT만 지원)

## 6. 웹사이트(Explorer) 구현
- React + Chakra UI로 간결한 Explorer 페이지
- Solana Web3.js로 실시간 토큰 정보/거래 내역 조회
- 초보자도 쉽게 볼 수 있는 UI/UX

## 7. GitHub Pages 정적 배포
### 1) 배포 준비
```bash
npm run build
npm run deploy
```
- 자동으로 `gh-pages` 브랜치에 빌드 결과가 올라가며, `https://[깃허브ID].github.io/victor-token-explorer`에서 확인 가능

### 2) 커스텀 도메인 사용 시
- `public/CNAME` 파일에 도메인 입력 후 재배포

## 8. 주요 명령어
```bash
# 개발 서버 실행
npm start

# 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

## 9. 참고/문제 해결
- manifest.json 401 에러: 브라우저 확장, 네트워크, Vercel 비공개 등 환경적 원인
- Vercel, Netlify, Cloudflare Pages 등 다른 무료 배포 플랫폼도 사용 가능

---

**문의/기여:** [깃허브 이슈](https://github.com/bluewhale2025/victor-token-explorer/issues) 