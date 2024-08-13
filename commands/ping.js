const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const botName = interaction.client.user.username;
    await interaction.reply(`My name is ${botName}`);
  },
};
