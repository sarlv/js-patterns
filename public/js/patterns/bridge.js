/*
    Bridge
    src: http://www.joezimjs.com/javascript/javascript-design-patterns-bridge/
*/

var RemoteControl = function(tv) {
    this.tv = tv;
  
    this.on = function() {
        this.tv.on();
    };
  
    this.off = function() {
        this.tv.off();
    };
  
    this.setChannel = function(ch) {
        this.tv.tuneChannel(ch);
    };
};
  
/* Newer, Better Remote Control */
var PowerRemote = function(tv) {
    this.tv = tv;
    this.currChannel = 0;
  
    this.setChannel = function(ch) {
        this.currChannel = ch;
        this.tv.tuneChannel(ch);
    };
  
    this.nextChannel = function() {
        this.setChannel(this.currChannel + 1);
    };
  
    this.prevChannel = function() {
        this.setChannel(this.currChannel - 1);
    };
};
PowerRemote.prototype = new RemoteControl();
  
  
/** TV Interface
    Since there are no Interfaces in JavaScript I am just
    going to use comments to define what the implementors
    should implement
  
    function on
    function off
    function tuneChannel(channel)
*/
  
/* Sony TV */
var SonyTV = function() {
    this.on = function() {
        console.log('Sony TV is on');
    };
  
    this.off = function() {
        console.log('Sony TV is off');
    };
  
    this.tuneChannel = function(ch) {
        console.log('Sony TV tuned to channel ' + ch);
    };
}
  
/* Toshiba TV */
var ToshibaTV = function() {
    this.on = function() {
        console.log('Welcome to Toshiba entertainment');
    };
  
    this.off = function() {
        console.log('Goodbye Toshiba user');
    };
  
    this.tuneChannel = function(ch) {
        console.log('Channel ' + ch + ' is set on your Toshiba television');
    };
}
  
/* Let's see it in action */
var sony = new SonyTV(),
    toshiba = new ToshibaTV(),
    std_remote = new RemoteControl(sony),
    pwr_remote = new PowerRemote(toshiba);
  
std_remote.on();            // prints "Sony TV is on"
std_remote.setChannel(55);  // prints "Sony TV tuned to channel 55"
std_remote.setChannel(20);  // prints "Sony TV tuned to channel 20"
std_remote.off();           // prints "Sony TV is off"
  
pwr_remote.on();            // prints "Welcome to Toshiba entertainment"
pwr_remote.setChannel(55);  // prints "Channel 55 is set on your Toshiba television"
pwr_remote.nextChannel();   // prints "Channel 56 is set on your Toshiba television"
pwr_remote.prevChannel();   // prints "Channel 55 is set on your Toshiba television"
pwr_remote.off();           // prints "Goodbye Toshiba user"













