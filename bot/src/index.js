import 'dotenv/config';
import {
  ActionRowBuilder,
  ChannelType,
  Client,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  MessageFlags,
  ModalBuilder,
  REST,
  Routes,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

const {
  DISCORD_TOKEN: token,
  DISCORD_CLIENT_ID: clientId,
  DISCORD_GUILD_ID: guildId,
  REQUEST_CHANNEL_ID: requestChannelId,
  PORTFOLIO_URL: portfolioUrl = 'https://portfolio-woad-three-61.vercel.app',
} = process.env;

for (const [key, value] of Object.entries({ DISCORD_TOKEN: token, REQUEST_CHANNEL_ID: requestChannelId })) {
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const requestCommand = new SlashCommandBuilder()
  .setName('website-request')
  .setDescription('Send Webloom a private request for a new website');
async function registerCommand(applicationId) {
  const rest = new REST({ version: '10' }).setToken(token);
  const requestRoute = guildId
    ? Routes.applicationGuildCommands(applicationId, guildId)
    : Routes.applicationCommands(applicationId);
  await rest.put(requestRoute, { body: [requestCommand.toJSON()] });
}

function briefModal(userId) {
  const modal = new ModalBuilder()
    .setCustomId(`website-request:brief:${userId}`)
    .setTitle('Tell us about your website');
  const project = new TextInputBuilder()
    .setCustomId('project')
    .setLabel('Business or project name')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(100)
    .setRequired(true);
  const goals = new TextInputBuilder()
    .setCustomId('goals')
    .setLabel('What should the website do?')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1000)
    .setRequired(true);
  const scope = new TextInputBuilder()
    .setCustomId('scope')
    .setLabel('Pages or features you need')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1000)
    .setRequired(false);
  const references = new TextInputBuilder()
    .setCustomId('references')
    .setLabel('Links, references, timing, or budget')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(1000)
    .setRequired(false);

  modal.addComponents(
    new ActionRowBuilder().addComponents(project),
    new ActionRowBuilder().addComponents(goals),
    new ActionRowBuilder().addComponents(scope),
    new ActionRowBuilder().addComponents(references),
  );
  return modal;
}

async function openBrief(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Run this command in the Webloom Discord server.', flags: MessageFlags.Ephemeral });
    return;
  }
  await interaction.showModal(briefModal(interaction.user.id));
}

async function submitBrief(interaction) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  const channel = await client.channels.fetch(requestChannelId).catch(() => null);
  if (!channel || channel.type !== ChannelType.GuildText || channel.guildId !== interaction.guildId) {
    await interaction.editReply('The Webloom request channel is not configured correctly. Please contact LexS.');
    return;
  }

  const project = interaction.fields.getTextInputValue('project');
  const goals = interaction.fields.getTextInputValue('goals');
  const scope = interaction.fields.getTextInputValue('scope') || 'Not specified yet.';
  const references = interaction.fields.getTextInputValue('references') || 'Not specified yet.';
  const embed = new EmbedBuilder()
    .setColor(0x7890ff)
    .setTitle('New Webloom website request')
    .setThumbnail(`${portfolioUrl}/assets/webloom/webloom-mark.png`)
    .setDescription(`From **${interaction.user.tag}** · Discord ID: ${interaction.user.id}`)
    .addFields(
      { name: 'Business or project', value: project },
      { name: 'What the website should do', value: goals },
      { name: 'Pages or features', value: scope },
      { name: 'Links, references, timing, or budget', value: references },
    )
    .setTimestamp();

  try {
    await channel.send({ embeds: [embed], allowedMentions: { parse: [] } });
  } catch {
    await interaction.editReply('The bot needs View Channel, Send Messages, and Embed Links in the private request channel.');
    return;
  }
  await interaction.editReply('Your website request was sent privately to the Webloom team. They can follow up with you on Discord.');
}

client.once(Events.ClientReady, async readyClient => {
  try {
    await registerCommand(clientId || readyClient.user.id);
    console.info(`Webloom request bot ready as ${readyClient.user.tag}; slash command registered.`);
  } catch {
    console.error('The bot connected, but the website-request command could not be registered. Check the application and server IDs.');
  }
});

client.on(Events.InteractionCreate, async interaction => {
  try {
    if (interaction.isChatInputCommand() && interaction.commandName === 'website-request') {
      await openBrief(interaction);
      return;
    }
    if (interaction.isModalSubmit() && interaction.customId === `website-request:brief:${interaction.user.id}`) {
      await submitBrief(interaction);
    }
  } catch {
    const response = { content: 'That request could not be completed. Please try again or contact LexS directly.', flags: MessageFlags.Ephemeral };
    if (interaction.deferred || interaction.replied) await interaction.followUp(response).catch(() => {});
    else await interaction.reply(response).catch(() => {});
  }
});

client.login(token).catch(() => {
  console.error('The bot could not log in. Check the configured Discord token.');
  process.exitCode = 1;
});
