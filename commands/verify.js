const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { ambassadors, welcome, general, unverified, verified } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify a new member.')
        .addMentionableOption(option =>
            option.setName('member')
            .setDescription('Mention the member.')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const member = interaction.options.getMentionable('member');
        const welcomeChannel = interaction.guild.channels.cache.get(welcome);
        const generalChannel = interaction.guild.channels.cache.get(general);
        const ambassadorsRole = interaction.guild.roles.cache.get(ambassadors);
        const verifiedRole = interaction.guild.roles.cache.get(verified);
        const unverifiedRole = interaction.guild.roles.cache.get(unverified);

        member.roles.add(verifiedRole);
        member.roles.remove(unverifiedRole);

        const welcomeEmbed = new MessageEmbed()
        .setColor('#2F3136')
        .setTitle(`Welcome To ${interaction.guild.name} `)
        .setDescription(`${member}, welcome! You've been verified and should have access to the full server.\n\n__**Next you can:**__\n☆ visit <#675882498445672459> to add more roles\n☆ post an introduction in <#589053931704025098>\n☆ say hello to everyone in <#588775705794445324>.`)
        .setTimestamp()
        .setFooter({ text: `Verified by: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        const ambassadorMessage = `${ambassadorsRole} **Hey everyone!** ${member} has joined us as a new member. Say hello!\n\n${member}, feel free to make yourself at home by adding <#675882498445672459>, introducing yourself in <#589053931704025098>, and checking out the rest of our channels. If you get lost, feel free to check out the <#617149628323987457>.`

        generalChannel.send(ambassadorMessage);
        welcomeChannel.send(`${member}`)
        welcomeChannel.send({ embeds: [welcomeEmbed] });
        await interaction.reply({content: `${member} has been verified!`, ephemeral: true});
    }
};