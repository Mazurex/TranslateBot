const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const translate = require('@iamtraction/google-translate');
 
module.exports = {
   data: new SlashCommandBuilder()
       .setName('translate')
       .setDescription('translate text into any language!')
       .addStringOption(option =>
            option
                .setName('input')
                .setDescription('What text to translate')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('language')
                .setDescription('Which language to translate to (deafult is english)')),
   async execute(interaction) {
    const input = interaction.options.getString('input');
    const lang = interaction.options.getString('language') ?? 'en';
    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Docs')
                .setURL('https://docs.google.com/document/d/10bTra6NEh8AOuPcAfZ_EpcOjwwuL8gdmYA_60v-Pl5A/edit?usp=sharing')
                .setStyle(ButtonStyle.Link)
        )

    try {
        const translated = await translate(input, { to: lang });
        const embed = new EmbedBuilder()
            .addFields(
                { name: 'Not Translated', value: input },
                { name: 'Translate to', value: lang },
                { name: 'Translated', value: translated.text }
            )
            .setFooter({ text: 'TranslateBot' })
            .setTimestamp()
        interaction.reply({ embeds: [embed], components: [button] });
    } catch(err) {
        interaction.reply({ content: 'You have not entered a correct language, please read our docs for a full list of available commands', components: [button] })
    }
   },
};