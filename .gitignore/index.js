

const Discord = require('discord.js');

const client = new Discord.Client();

const yt = require('ytdl-core');

var weather = require('weather-js');

var dispatcher

var prefix = "/";

let queue = {};











client.on("ready", () => {

  console.log('Bot en Fonction');

  
});



var mots_embed = new Discord.RichEmbed()
 .setColor('#00FEDC')
 .addField("Pas Bien", "Ce n'est pas bien de dire des gros mots")





var badWords = [
    'shit',
    'ass',
    'fuck',
    'bitch',
    'enculé',
    'batard',
    'bite',
    'chatte',
    'chattes',
    'chibre',
    'connard',
    'chiasse',
    
  ];
  
  client.on('message', message => {
    var words = message.content.toLowerCase().trim().match(/\w+|\s+|[^\s\w]+/g);
    var containsBadWord = words.some(word => {
      return badWords.includes(word);
    });
    if (containsBadWord) {
      message.delete(1);
      message.channel.send("Ce mot n'est pas apropprié");
    }
  });


client.on('message', message => {
  if (message.content === "test") {
    message.reply('test !');
  } else if (message.content === ("bonjour")){
    message.reply('bonjour à toi ');
  } else if(message.content.startsWith('!botname')){
    client.user.setUsername(message.content.substr(9));
  } else if (message.content === "!stats") {
    let m = " ";
    m += 'Il y a actuellement  ${message.guild.channels.size} channels sur ce serveurs \n';
    m += 'je suis en compagnie de ${message.guild.members.size} membres';
    m += 'je suis présent dans ${client.guild.size} serveurs \n';
    message.author.sendMessage(m).catch(console.log); 
  } 
  else if (message.content.startsWith("/méteo")){
      var location = message.content.substr(6);
      var unit = "C";
      
      try {
          weather.find({search: location, degreeType: unit}, function(err, data) {
              if(err) {
                  console.log(Date.now(), "DANGER", "Je ne peut pas trouvé d'information pour la méteo de " + location);
                  message.reply("\n" + "Je ne peut pas trouvé d'information pour la méteo de " + location);
              } else {
                  data = data[0];
                 console.log("**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
                 message.reply("\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
              }
          });
      } catch(err) {
          console.log(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
          message.reply("Idk pourquoi c'est cassé tbh :(");
      }

    }

  })

  client.on("message", message => {
  if(message.content[0] === prefix) {

    let SplitMessage = message.content.split(" ");
    if(SplitMessage[0] === '/play'){
  if(SplitMessage.length === 2)
  {
  
  if(message.member.voiceChannel){
  
  
  message.member.voiceChannel.join().then(Connection => {
  
    dispatcher = Connection.playArbitraryInput(SplitMessage[1]);
  
    dispatcher.on('error', e => {
  
  console.log('erreur');
  
  
    });
  
    dispatcher.on('end', e => {
  dispatcher = undefined;
      console.log('Le bot a terminer de jouer la musique');
      
      
        });
  }).catch(console.log);
  
  }
  else
  
 console.log(message, ':x: Erreur: vous devait vous trouver dans un channel vocal ')
  }
  else
  
  console.log(message, ':x: Erreur')
  
  
  }
  
  }
  });    
  


client.login(process.env.TOKEN);
