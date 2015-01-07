/*

Когда какой-либо из объектов- коллег 
изменяет свое состояние, он извещает об 
этом посредника, а по- средник сообщает об 
изменениях всем остальным коллегам, которые 
должны знать об этом.

<p>Player one press "1", player two press "0". Go! (you have half a minute...)</p>
<div id="results"></div>

*/

function Player(name) {
    this.points = 0;
    this.name = name;
}

Player.prototype.play = function() {
    this.points += 1;
    mediator.played();
};

var scoreboard = {

    element: document.getElementById('results'),

    update: function(score) {

        var i, msg = '';
        for (i in score) {
            if (score.hasOwnProperty(i)) {
                msg += '<p><strong>' + i + '<\/strong>: ';
                msg += score[i];
                msg += '<\/p>';
            }
        }
        this.element.innerHTML = msg;
    }
};


var mediator = {

    players: {},
 
    setup: function() {
        var players = this.players;
        players.home = new Player('Home');
        players.guest = new Player('Guest');

    },

    played: function() {
        var players = this.players,
            score = {
                Home: players.home.points,
                Guest: players.guest.points
            };

        scoreboard.update(score);
    },

    keypress: function(e) {
        e = e || window.event; // IE
        if (e.which === 49) { // key "1"
            mediator.players.home.play();
            return;
        }
        if (e.which === 48) { // key "0"
            mediator.players.guest.play();
            return;
        }
    }
};



mediator.setup();
window.onkeypress = mediator.keypress;

setTimeout(function() {
    window.onkeypress = null;
    alert('Game over!');
}, 10000);








