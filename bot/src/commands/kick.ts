import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server.')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('The member to kick')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Reason for kicking'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    
  async execute(interaction, client) {
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    
    if (!targetUser) {
      await interaction.reply({ content: 'Invalid target user.', ephemeral: true });
      return;
    }

    const member = await interaction.guild?.members.fetch(targetUser.id).catch(() => null);

    if (!member) {
      await interaction.reply({ content: 'That user is not in this server.', ephemeral: true });
      return;
    }

    if (!member.kickable) {
      await interaction.reply({ content: 'I do not have permission to kick this user. My role may be lower than theirs.', ephemeral: true });
      return;
    }

    try {
      await member.kick(reason);
      await interaction.reply({ content: `✅ **${targetUser.tag}** has been kicked.\n**Reason:** ${reason}` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while trying to kick the user.', ephemeral: true });
    }
  },
};
