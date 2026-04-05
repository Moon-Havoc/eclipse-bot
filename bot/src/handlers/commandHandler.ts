import { Client, Collection, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { Command } from "../types";

export const commands = new Collection<string, Command>();

export async function loadCommands(client: Client) {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

  const restPayload = [];

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { command } = require(filePath);

    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
      restPayload.push(command.data.toJSON());
      console.log(`[Plugin] Loaded command: ${command.data.name}`);
    } else {
      console.warn(`[Warning] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  // Register slash commands globally once client is ready
  client.once("clientReady", async () => {
    try {
      if (!process.env.DISCORD_TOKEN || !client.user) return;
      
      const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
      
      console.log(`Started refreshing ${restPayload.length} application (/) commands.`);
      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: restPayload }
      );
      console.log(`Successfully reloaded ${restPayload.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  });

  // Handle interaction creation
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
      } else {
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
      }
    }
  });
}
