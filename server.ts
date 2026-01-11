import express, { Request, Response } from "express";
import { paymentMiddleware } from "x402-express";
import { Facilitator, createExpressAdapter } from "x402-open";
import { baseSepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 4021;

// Load and validate environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SELLER_WALLET_ADDRESS = process.env.SELLER_WALLET_ADDRESS;
const NODE_BASE_URL = process.env.NODE_BASE_URL;

if (!PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY");
if (!SELLER_WALLET_ADDRESS) throw new Error("Missing SELLER_WALLET_ADDRESS");
if (!NODE_BASE_URL) throw new Error("Missing NODE_BASE_URL");

// 1. Create facilitator node
const facilitator = new Facilitator({
  evmPrivateKey: PRIVATE_KEY as `0x${string}`,
  evmNetworks: [baseSepolia],
});

// 2. Expose facilitator endpoints
createExpressAdapter(facilitator, app, "/facilitator");

// 3. Protect your paid API route
app.use(
  paymentMiddleware(
    SELLER_WALLET_ADDRESS as `0x${string}`,
    {
      "GET /weather": {
        price: "$0.0001",
        network: "base-sepolia",
      },
    },
    {
      url: NODE_BASE_URL as `http${string}`,
    }
  )
);

// 4. Paid endpoint
app.get("/weather", (req: Request, res: Response) => {
  res.json({
    weather: "sunny",
    temperature: 74,
    paid: true,
  });
});

// 5. Root endpoint for basic status info
app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "x402-open integration active",
    facilitator: "/facilitator/supported",
    paidEndpoint: "/weather",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Facilitator at http://localhost:${PORT}/facilitator/supported`);
});
