const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const { modchannel } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Send your information to the mods to be accepted.")
    .addStringOption((option) =>
      option
        .setName("age")
        .setDescription("Your current age.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("socialmedia")
        .setDescription("A current social media, i.e. @enigmaleaDA on twitter.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("additional")
        .setDescription("Any additional info for the mods")
        .setRequired(false)
    ),
  async execute(interaction) {
    const channel = interaction.guild.channels.cache.get(modchannel);
    const age = interaction.options.getString("age");
    const socialmedia = interaction.options.getString("socialmedia");
    const additional =
      interaction.options.getString("additional") === null
        ? "*None*"
        : interaction.options.getString("additional");
    const nickname = interaction.member.displayName;
    const user = interaction.user.tag;
    const id = interaction.member.id;
    const created = dayjs(interaction.user.createdAt).unix();
    const accountage = dayjs(interaction.user.createdAt).toNow(true);
    const joined = dayjs(interaction.member.joinedAt).unix();
    const sent = dayjs(interaction.createdAt).unix();

    const appEmbed = new MessageEmbed()
      .setColor("#2F3136")
      .setTitle("New Member Application")
      .setDescription(
        `**Nickname:** ${nickname}\n**User:** ${user} <@${id}>\n**ID:** ${id}\n**Account Created:** <t:${created}>\n**Account Age:** ${accountage}\n\n**Joined:** <t:${joined}>\n**Application Sent:** <t:${sent}>\n\n**Age:** ${age}\n**Social Media:** ${socialmedia}\n**Additional Info:** ${additional}`
      )
      .setTimestamp();

    channel.send({ embeds: [appEmbed] });
    await interaction.reply({
      content:
        "Your application has been received and will be reviewed within 48 hours.",
      ephemeral: true,
    });
  },
};
