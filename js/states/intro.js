$.Intro = function(g) {

	this.game = g;
    this.hw = g.w/2;

    try {
        g.ctx.drawImage(g.imgs.skull_8, 125, 240);
    } catch (e) {
        window.location.href=window.location.href;
        return;
    }

    g.sfxPlay('powerup');


};


$.Intro.prototype.update = function() {

	var g = this.game;

	if (g.input.down || g.tick > 200) {
		g.changeState('Splash');	
	}

};

$.Intro.prototype.render = function() {


	var g= this.game;

    g.ctx.font = '18px "Lucida Console", Console, monospace';
    this.t1 = ~~(this.hw - ( g.ctx.measureText('@eoinmcg').width  / 2));
    this.t2 = ~~(this.hw - ( g.ctx.measureText('Presents...').width  / 2));

    g.ctx.fillStyle = '#333333';
	g.ctx.fillRect(0, 0, g.w, g.h);
	g.ctx.fillRect(0, 0, g.w, g.h);
    g.ctx.fillStyle = '#ff0';
    g.ctx.fillText('@eoinmcg', this.t1, 150);
    g.ctx.fillText('Presents...', this.t2, 200);



};



