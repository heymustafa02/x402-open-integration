# x402-open-integration

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```
<!-- 
This project was created using `bun init` in bun v1.2.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
x402-open Integration Server

This project is a minimal custom integration of x402-open, a decentralized facilitator toolkit for the X402 protocol.
It demonstrates how to run a self-hosted facilitator node and protect an API endpoint using on-chain micro-payments (Base Sepolia).

This implementation was built from scratch using Express and the x402-open library.

Features

Self-hosted X402 facilitator node

Base Sepolia (EVM) support

Protected paid API route (/weather)

x402-express payment middleware

Clean TypeScript server implementation

Easy to deploy (Railway/Render/VPS)

Project Structure
server.ts           Main server + facilitator + middleware
.env.example        Environment variable template
package.json        Dependencies

Environment Setup

Create a .env file based on .env.example:

PRIVATE_KEY=0x...
SELLER_WALLET_ADDRESS=0x...
NODE_BASE_URL=http://localhost:4021/facilitator
PORT=4021


PRIVATE_KEY
EVM key used by the facilitator.

SELLER_WALLET_ADDRESS
Public wallet address that receives micro-payments.

NODE_BASE_URL
The facilitator URL (local or deployed).

Local: http://localhost:4021/facilitator

Production: https://your-app.up.railway.app/facilitator

Running Locally
npm install
npm run build
npm start


Server will be available at:

http://localhost:4021


Facilitator metadata:

http://localhost:4021/facilitator/supported


Paid endpoint (requires X402 payment):

http://localhost:4021/weather -->