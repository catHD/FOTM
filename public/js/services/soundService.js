//Сервис звуков в игре
(function (module) {
    module.service('soundService', function(ngAudio, $timeout) {
        var loadedSounds = [];
        var musicObj = {};
        var soundObj = {};
        var soundEnabled = true;
        var musicEnabled = true;

        //Музыка
        musicObj.cityAmbience = ngAudio.load("sounds/music/city.mp3");
        musicObj.cityAmbience.loop = true;
        musicObj.cityAmbience.volume=0.1;

        musicObj.winMusic = ngAudio.load("sounds/music/win.mp3");
        musicObj.winMusic.volume=0.4;

        musicObj.loseMusic = ngAudio.load("sounds/music/lose.mp3");
        musicObj.loseMusic.volume=0.4;

        //Звуки
        soundObj.newMessage = ngAudio.load("sounds/fx/chat.mp3");
        soundObj.newMessage.volume=0.6;

        soundObj.joinArena = ngAudio.load("sounds/fx/join-arena.mp3");
        soundObj.joinArena.volume=0.6;

        return {
            playSound: function(name){
                if(!this.soundEnabled) return;
                var newSound = ngAudio.load(loadedSounds[name]);
                newSound.volume=0.4;
                newSound.play();
                $timeout(function(){
                    newSound.destroy();
                },500);
            },
            loadSounds: function(){
                var fxNames = [
                    'block',
                    'death',
                    'dodge',
                    'initiative',
                    'luck',
                    'miss',
                    'move'
                ];

                var spellNames = [
                    'Strong Arm Of The Law',
                    'Defender Of The Faith',
                    'Disarm',
                    'Walk Away',
                    'Sanctuary',
                    'The Punishment Due',
                    'Come And Get It',
                    'New Faith',

                    'Die By The Sword',
                    'Reign In Blood',
                    'Grinder',
                    'Follow The Tears',
                    'Made In Hell',
                    'Spill The Blood',
                    'Dyers Eve',
                    'I Dont Wanna Stop',

                    'Shot Down In Flames',
                    'Electric Eye',
                    'Lights In The Sky',
                    'Thunderstruck',
                    'You Aint No Angel',
                    'State Of Grace',
                    'My Last Words',
                    'Come Cover Me',

                    'Inject The Venom',
                    'Invisible',
                    'Jawbreaker',
                    'Hog Tied',
                    'Running Free',
                    'Fast As The Shark',
                    'Prowler',
                    'Fade To Black',

                    'Stargazer',
                    'Speed Of Light',
                    'Never A Word',
                    'Prophecy',
                    'Lets Me Take It',
                    'Brain Damage',
                    'Infinite Dreams',
                    'Caught Somewhere In Time',

                    'Family Tree',
                    'Fireball',
                    'Burning Ambition',
                    'Thank God For The Bomb',
                    'Thank God For The Bomb (explode)',
                    'Powerslave',
                    'Cauterization',
                    'Down In Flames',
                    'Fight Fire With Fire',

                    'Hammer Of The Gods',
                    'Mercyful Fate',
                    'Holy Smoke',
                    'Laying On Hands',
                    'Cleanse The Soul',
                    'Hallowed Be Thy Name',
                    'Hit The Lights',
                    'Heaven Can Wait',

                    'Bloodsucker',
                    'Fear Of The Dark',
                    'Creeping Death',
                    'Spreading The Disease',
                    'Purgatory',
                    'Children Of The Damned',
                    'Locked And Loaded',
                    'A Touch Of Evil'
                ];

                 for(var i=0;i<fxNames.length;i++){
                    loadedSounds[fxNames[i]]="sounds/fx/"+fxNames[i]+".mp3";
                 }
                 for(i=0;i<spellNames.length;i++){
                    loadedSounds[spellNames[i]]="sounds/fx/spells/"+spellNames[i]+".mp3";
                 }

            },
            chooseAmbient: function(type) {
                if(musicObj.battleAmbience){
                    musicObj.battleAmbience.destroy();
                }
                switch(type){
                    case 0: musicObj.battleAmbience = ngAudio.load("sounds/music/grass.mp3"); break;
                    case 1: musicObj.battleAmbience = ngAudio.load("sounds/music/desert.mp3"); break;
                    case 2: musicObj.battleAmbience = ngAudio.load("sounds/music/snow.mp3"); break;
                }
                musicObj.battleAmbience.loop=true;
                musicObj.battleAmbience.volume=0.1;
                musicObj.battleAmbience.play();
                musicObj.battleAmbience.setMuting(!this.musicEnabled);
            },
            getMusicObj: function () {
                return musicObj;
            },
            getSoundObj: function() {
                return soundObj;
            },
            get soundEnabled() {
                return soundEnabled;
            },
            set soundEnabled(val){
                for(var sound in soundObj){
                    if(soundObj.hasOwnProperty(sound)){
                        soundObj[sound].setMuting(!val);
                    }
                }
                soundEnabled = val;
            },
            get musicEnabled() {
                return musicEnabled;
            },
            set musicEnabled(val){
                for(var music in musicObj){
                    if(musicObj.hasOwnProperty(music)){
                        musicObj[music].setMuting(!val);
                    }
                }
                musicEnabled = val;
            }
        }
    });
})(angular.module("fotm"));