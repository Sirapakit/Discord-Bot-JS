require('dotenv').config();

const { Client, IntentsBitField, TextChannel } = require('discord.js');
const fs = require("fs")

const client = new Client({ 
  intents: [IntentsBitField.Flags.Guilds, 
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
            IntentsBitField.Flags.GuildVoiceStates] });

const voiceChannelData = JSON.parse(fs.readFileSync("./setting/voiceChannel.json"))
const textChannelData = JSON.parse(fs.readFileSync("./setting/textChannel.json"))

// Initialise 
client.on('ready', (c) => {
	console.log(`✅ ${c.user.tag} is online.`);
});

// Welcome BOT
client.on('guildMemberAdd', (member) => {
  console.log(`${member.user.username} has join BCI-Discord server!`);
  const message = `Welcome <@${member.id}> to our server!`;
  const channel = member.guild.channels.cache.get(textChannelData["wel"]);
  channel.send(message);
});

// Voice Channels
client.on('voiceStateUpdate', (oldState, newState) => {
    for (const key in voiceChannelData) {
        if (oldState.channelId !== newState.channelId) {
            const voiceChannel = client.channels.cache.get(voiceChannelData[key]);

            if (voiceChannel) {
                const member = newState.member;
                if (!oldState.channelId && newState.channelId === voiceChannelData[key]) {
                    console.log(`User "${member.user.username}" has joined the "${key}" voice channel`);
                  } else if (oldState.channelId === voiceChannelData[key] && newState.channelId !== voiceChannelData[key]) {
                    console.log(`User "${member.user.username}" has left the "${key}" voice channel`);
                  }
            }
        }
    }
});

// Track all upcoming Discord events
client.on('raw', async (packet) => {
    if (packet.t === 'GUILD_CREATE') {
      const data = packet.d;
      
      if (data.guild_scheduled_events.length > 0) {
        const scheduledEvents = data.guild_scheduled_events;
        
        for (const event of scheduledEvents) {
          const eventChannelID = event.channel_id;
          let eventChannelName = Object.keys(voiceChannelData).find(key => voiceChannelData[key] === eventChannelID);
          const eventName = event.name;
          const eventStartTime = event.scheduled_start_time;
          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
          };
          const formattedDate = new Date(eventStartTime).toLocaleString('en-US', options);
          const currentTime = new Date();
          const timeDiff = Math.abs(new Date(eventStartTime) - currentTime) / 36e5;
          console.log(JSON.stringify({ eventName: eventName, startTime: eventStartTime}));
          
          if (timeDiff <= 1) {
            try {
              const channel = await client.channels.fetch(textChannelData["wel"]);
              if (channel instanceof TextChannel) {
                const message = `Hey @here, the event "${eventName}" will start in ${Math.floor(timeDiff * 60)} minutes at ${eventChannelName}.`;
                channel.send(message).catch((error) => console.error('Error sending message:', error));
              } else {
                console.error('Invalid channel or not a text channel.');
              }
            } catch (error) {
              console.error('Error fetching channel:', error);
            }
          }
        }
      }
    } else {
      // Do nothing
    }
  });

// debugging and message tracking
client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }
  
console.log(`${message.content} was sent by ${message.author.username}`);

  if (message.content === 'hello') {
    message.reply('hey!');
  }
});

client.login(process.env.TOKEN);
// client.login("MTExMjgwMTI3ODEwODY0MzQyOQ.GnRMw4.GtXu_IB9Y9o2wGopbPeDCWC701g_ekEZ0fxavg");
