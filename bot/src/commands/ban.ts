import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server.')
    .addUserOption(option => 
      option.setName('target')
        .setDescription('The member to ban')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('reason')
        .setDescription('Reason for banning'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    
  async execute(interaction) {
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    
    if (!targetUser) {
      await interaction.reply({ content: 'Invalid target user.', ephemeral: true });
      return;
    }

    const member = await interaction.guild?.members.fetch(targetUser.id).catch(() => null);

    if (member && !member.bannable) {
      await interaction.reply({ content: 'I do not have permission to ban this user. My role may be lower than theirs.', ephemeral: true });
      return;
    }

    try {
      await interaction.guild?.members.ban(targetUser.id, { reason });
      await interaction.reply({ content: `✅ **${targetUser.tag}** has been banned.\n**Reason:** ${reason}` });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while trying to ban the user.', ephemeral: true });
    }
  },
};
