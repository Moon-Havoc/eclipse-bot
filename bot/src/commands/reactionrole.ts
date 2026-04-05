import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../types';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('Create a reaction role message in the channel.')
    .addRoleOption(option => 
      option.setName('role')
        .setDescription('The role to assign upon reacting')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('emoji')
        .setDescription('The emoji to use for the reaction')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    
  async execute(interaction) {
    const role = interaction.options.getRole('role', true);
    const emoji = interaction.options.getString('emoji', true);
    
    const message = await interaction.reply({ 
      content: `React with ${emoji} to get the **${role.name}** role!`, 
      fetchReply: true 
    });

    try {
      await message.react(emoji);
    } catch (error) {
      console.error(error);
      await interaction.followUp({ content: 'Could not add the reaction. Make sure the emoji is valid!', ephemeral: true });
    }
  },
};
