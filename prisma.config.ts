// prisma.config.ts
import "dotenv/config";  // env variables load करने के लिए (जरूरी!)
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",  // या आपका path अगर अलग है
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),  // ← connection URL यहीं से आएगा
  },
});
