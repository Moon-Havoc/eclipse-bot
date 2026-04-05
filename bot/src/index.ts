import { Client, GatewayIntentBits, Partials } from 'discord.js';
import * as dotenv from 'dotenv';
import path from 'path';
import { loadCommands } from './handlers/commandHandler';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once('clientReady', () => {
  console.log(`[Bot] Successfully logged in as ${client.user?.tag}`);
  console.log(`[Bot] Serving ${client.guilds.cache.size} guilds.`);
});

// Logging Module Stub
client.on('messageDelete', async (message) => {
  if (message.partial || message.author?.bot) return;
  console.log(`[Logger] Message from ${message.author.tag} deleted: ${message.content}`);
});

client.on('error', (error) => {
  console.error('[Bot Error]', error);
});

async function bootstrap() {
  try {
    const token = process.env.DISCORD_TOKEN;
    if (!token) {
      throw new Error('DISCORD_TOKEN is not defined in the environment variables.');
    }
    
    // Create a dummy health check server for Render's "Web Service" requirement
    const http = require('http');
    const port = process.env.PORT || 8080;
    http.createServer((req: any, res: any) => {
      res.writeHead(200);
      res.end('Bot is active and running!');
    }).listen(port, () => console.log(`[Web] Health server listening on port ${port}`));

    // Load Commands & Register Event Handlers for Commands
    await loadCommands(client);

    await client.login(token);
  } catch (error) {
    console.error('Failed to start the bot:', error);
    process.exit(1);
  }
}

bootstrap();
