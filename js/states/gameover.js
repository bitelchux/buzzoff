$.Gameover = function(g) {
	this.game = g;
    g.input.down = 0;

    this.drawCalls = ['score', 'combo'];
    this.currCalls = [];
    this.interval = 75;
    this.counter = 0;

    if (g.score > g.hiScore) {
        this.drawCalls.push('newHi');
        g.hiScore = g.score;
        localStorage.setItem('hiScore', g.hiScore);
    }

};


$.Gameover.prototype.update = function() {

	var g= this.game;

    this.counter += 1;

    if (this.counter % this.interval === 0) {
        if (this.currCalls.length < this.drawCalls.length) {
            this.currCalls.push(this.drawCalls[this.currCalls.length]);
            g.sfx.powerup.play();
        }
    }

	if (g.input.down) {
        if (this.tweet()) {
            window.location = "https://twitter.com/intent/tweet?&text=I+scored+"+g.score+"+in+BuzzOff&hashtags=js13kgames&via=eoinmcg&url=http%3A%2F%2Farcade.starfish.ie%2Fbuzzoff"; }

            else {
            g.changeState('Splash');	
        }
	}

};

$.Gameover.prototype.render = function() {


	var g= this.game,
        skull = g.imgs.skull_9,
        xpos = 120, x;

    g.ctx.fillStyle = 'rgba(200,0,0,1)';
	g.ctx.fillRect(0, 0, g.w, g.h);

	g.ctx.globalAlpha = 0.2;
    g.ctx.drawImage(skull, 0, 0, skull.width, skull.height,
        50, 100, 250, 250);
	g.ctx.globalAlpha = 1;

    this.gameover();
    for (x = 0; x < this.currCalls.length; x += 1) {
        this[this.currCalls[x]]();
    }

    this.twitter();

};


$.Gameover.prototype.score = function() {

    var g = this.game,s = 'SCORE  ' + g.score, x;
    
    x = g.stringW(s, g.fonts.h2);
    g.drawString(s, g.fonts.h2_s, x - 2, 202);
    g.drawString(s, g.fonts.h2, x, 200);
};


$.Gameover.prototype.combo = function() {

    var g = this.game, s = 'MAX COMBO  ' + g.maxCombo, x;

    x = g.stringW(s, g.fonts.h2);
    g.drawString(s, g.fonts.h2_s, x - 2, 242);
    g.drawString(s, g.fonts.h2, x, 240);
};


$.Gameover.prototype.newHi = function() {

    var g = this.game, s = 'NEW HISCORE', x;

    x = g.stringW(s, g.fonts.h2);
    g.drawString(s, g.fonts.h2_s, x - 2, 282);
    g.drawString(s, g.fonts.h2, x, 280);

};

$.Gameover.prototype.gameover = function() {

    var g = this.game, x, s;

	g.ctx.globalAlpha = g.fadeText;
    s = 'GAME';
    x = g.stringW(s, g.fonts.h1);
    g.drawString(s, g.fonts.h1_s, x-2, 52);
    g.drawString(s, g.fonts.h1, x, 50);

    s = 'OVER';
    x = g.stringW(s, g.fonts.h1);
    g.drawString(s, g.fonts.h1_s, x-2, 102);
    g.drawString(s, g.fonts.h1, x, 100);
	g.ctx.globalAlpha = 1;

};


$.Gameover.prototype.twitter = function() {

    var w = 200, g = this.game, cx = g.w /2 - (w / 2),
        s = 'TWEET SCORE', x;

    g.ctx.fillStyle = '#55ACEE';
    g.ctx.fillRect(cx, 380, w, 60);
    g.ctx.fillRect(cx - 5, 385, w + 10, 50);
    x = g.stringW(s, g.fonts.h2_s);
    g.drawString(s, g.fonts.h2, x + 11, 401);
    g.drawString(s, g.fonts.h2_s, x + 10, 400);
};


$.Gameover.prototype.tweet = function() {
    var g = this.game.input,
        x = g.x,
        y = g.y;

    return (y > 380 && x > 55 && x < 265);
    
};

