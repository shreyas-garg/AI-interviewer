/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:lUJ3RYbidky2@ep-curly-wave-a17yftuw.ap-southeast-1.aws.neon.tech/NeoHire?sslmode=require',
    }
  };