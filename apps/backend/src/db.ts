import "dotenv/config";
import dns from "node:dns";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Strip channel_binding=require and fix the SSL warning automatically
const connectionString = process.env
  .DATABASE_URL!.replace("&channel_binding=require", "")
  .replace("sslmode=require", "sslmode=verify-full");

const adapter = new PrismaPg({
  connectionString,
  connectionTimeoutMillis: 15000,
  // CRITICAL WSL + BUN FIX: Forces the TCP socket to resolve IPv4 only
  lookup: (hostname: string, options: any, callback: any) => {
    dns.lookup(hostname, { ...options, family: 4 }, callback);
  },
} as any);

export const prisma = new PrismaClient({ adapter });
