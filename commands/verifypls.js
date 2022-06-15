const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10')
const { welcome, modrole } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifypls')
        .setDescription('Remind a member to verify.')
        .addMentionableOption(option =>
            option.setName('member')
            .setDescription('Mention the member.')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const member = interaction.options.getMentionable('member');
        const welcomeChannel = interaction.guild.channels.cache.get(welcome);
        const modRole = interaction.guild.roles.cache.get(modrole);

        welcomeChannel.send(`${member} please be sure to submit your verification information to ${modRole} by running the slash command \`/apply\` and providing your age (required), social media account (required), and any `)
        await interaction.reply({content: `${member} has been reminded to verify!`, ephemeral: true})
    }
};