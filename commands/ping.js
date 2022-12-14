const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('How fast the bot responds'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });

		await interaction.editReply({ content: `Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms` });
	},
};