export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  permissions: string;
}

export async function getUserGuilds(accessToken: string): Promise<DiscordGuild[]> {
  try {
    const res = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return [];
    }

    const guilds: DiscordGuild[] = await res.json();
    
    // Filter guilds where user has Administrator (0x8) or Manage Guild (0x20)
    return guilds.filter((guild) => {
      const perms = BigInt(guild.permissions);
      return (perms & BigInt(0x8)) === BigInt(0x8) || (perms & BigInt(0x20)) === BigInt(0x20);
    });
  } catch (error) {
    console.error('Failed to fetch guilds:', error);
    return [];
  }
}
