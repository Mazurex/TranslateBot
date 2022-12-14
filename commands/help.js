const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
 
module.exports = {
   data: new SlashCommandBuilder()
       .setName('help')
       .setDescription('Get a list of all commands'),
   async execute(interaction) {
    interaction.reply({ embeds: [
        new EmbedBuilder()
            .setTitle('✋Help')
            .addFields(
                { name: '/translate', value: 'the main command, translate from and to every language!' },
                { name: '/ping', value: 'Get the bot\'s speed!' },
                { name: '\u200B', value: '\u200B' },
                { name: 'docs', value: 'Please read our docs for a __full__ understanding of the bot!' }
            )
    ], components: [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Docs')
                    .setURL('https://docs.google.com/document/d/10bTra6NEh8AOuPcAfZ_EpcOjwwuL8gdmYA_60v-Pl5A/edit?usp=sharing')
                    .setStyle(ButtonStyle.Link)
            )
    ] })
   }
};