import { SlashCommandBuilder, PermissionFlagsBits, TextChannel } from 'discord.js';
import { Command } from '../types';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear a specific number of messages in this channel.')
    .addIntegerOption(option => 
      option.setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount', true);
    
    const channel = interaction.channel;
    if (!channel || !(channel instanceof TextChannel)) {
      await interaction.reply({ content: 'This command can only be used in text channels.', ephemeral: true });
      return;
    }

    try {
      const deleted = await channel.bulkDelete(amount, true);
      await interaction.reply({ content: `✅ Successfully cleared **${deleted.size}** messages.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while trying to clear messages.', ephemeral: true });
    }
  },
};
