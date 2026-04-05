import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong and bot latency!'),
  async execute(interaction, client) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    
    await interaction.editReply(`Pong! 🏓\nLatency: \`${latency}ms\`\nAPI Latency: \`${Math.round(client.ws.ping)}ms\``);
  },
};
