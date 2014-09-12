$.Splash = function(g) {
	this.game = g;
    this.startTxt = (g.mobile) ?
        'TAP TO PLAY' :
        'CLICK TO PLAY';
};


$.Splash.prototype.update = function() {

	var g= this.game;

	if (g.input.down) {
		g.changeState('Play');	
	}

};

$.Splash.prototype.render = function() {


	var g = this.game, 
        steps = 6,
        gap = 50,
        x,
        i, y;


    g.ctx.fillStyle = '#729fcf';
	g.ctx.fillRect(0, 0, g.w, g.h);


    for (i = 0; i <= steps; i += 1) {
        y = g.h - gap * (i+1);
        g.ctx.fillStyle = 'rgba(255,255,255,0.'+(steps-i-2)+')';
        g.ctx.fillRect(0, y-gap, g.w, y);
    }

    g.ctx.fillStyle = '#4e9a06';
	g.ctx.fillRect(0, 400, g.w, g.h);

    g.ctx.fillStyle = 'rgba(0,0,0,0.1)';
    g.ctx.fillRect(0, g.h - 40, g.w, g.h);

    // x = ~~(( g.w / 2 ) - ( g.imgs.logo_shadow_10.width() / 2));
    g.ctx.globalAlpha = 0.4;
    g.ctx.drawImage(g.imgs.logo_shadow_10, 48, 72);
    g.ctx.globalAlpha = 1;
    g.ctx.drawImage(g.imgs.logo_10, 50, 70);

	g.ctx.globalAlpha = g.fadeText;
    g.drawString(this.startTxt, g.fonts.h2_s, 84, 251);
    g.drawString(this.startTxt, g.fonts.h2_p, 85, 250);
	g.ctx.globalAlpha = 1;

    g.ctx.drawImage(g.imgs.hive_9, 125, 340);

    var s = '' + ~~( g.hiScore );
    var pad = '000000';
    s = pad.substring(0, pad.length - s.length) + s;
    g.drawString('HI ' + s, g.fonts.h2_s, 110, 20);
    g.drawString('HI ' + s, g.fonts.h2, 108, 18);

};

