
$.Play = function(g) {

    var locs = [20, 90, 200, 270], i, tmp;

	this.game = g;
    g.chargeSpeed = 3;

    g.p1 = new $.Bee(g);
    g.ents.push(g.p1);
    g.slider = new $.Slider(g);
    g.ents.push(g.slider);

    for (i = 0; i < locs.length; i += 1) {
        tmp = new $.Hive(g, {x: locs[i], y: 380});
        g.ents.push(tmp);

    }

    g.score = 0;
    g.maxCombo = 0;
    g.newHiScore = false;
    this.scoreCount = g.score;

    this.level = 0;
    this.nextLevel = 1200;
    this.baddies = ['Ant', 'Hornet', 'Worm', 'Bug', 'Skull'];
    this.getLevelData();


};

$.Play.prototype.update = function() {

	var g = this.game, h = g.getByName('hive'), tmp;

    if (h.length === 0) {
		g.changeState('Gameover');	
    }

    if (this.tick > this.nextLevel) {
        this.getLevelData();
    }

    if (this.tick === this.levelData.powerUp) {
        g.ents.push(new $.Powerup(g));
    }

    if( this.tick % this.levelData.spawnInterval === 0) {
        tmp = $.utils.rndArray(this.levelData.baddies);
        g.ents.push(new $[tmp](g));
    }

	if (g.input.released) {
        if (g.p1.power < 4) {
            g.sfxPlay('hurt');
        }
        else {
            g.sfxPlay('shoot');
            g.ents.push(new $.Bullet(g, {
                power: g.p1.power,
                angle: g.p1.angle,
                x: g.p1.cx,
                y: g.p1.cy
            }));
        }
        g.p1.power = 0;
	
	}


	var i = g.ents.length;
	while (i--) {
		g.ents[i].update();
	}


    i = g.ents.length;
	while (i--) {
        if (g.ents[i].remove) {
            g.ents.splice(i, 1);
        }
    }

    if (this.scoreCount < g.score) {
        this.scoreCount += 0.2;
    }

    this.tick += 1;

};

$.Play.prototype.render = function() {


    var g = this.game,
        i = g.ents.length;


    g.ctx.drawImage(g.bgs.grass, 0, 0);

	while (i--) {
		g.ents[i].render();
	}


    var s = '' + ~~( this.scoreCount );
    var pad = '0000000';
    s = pad.substring(0, pad.length - s.length) + s;
    g.drawString(s, g.fonts.h2_s, 110, 20);
    g.drawString(s, g.fonts.h2, 108, 18);


};


$.Play.prototype.getLevelData = function() {

    var baddies = [], 
        t = 0,
        powerUp = ~~(Math.random() * this.nextLevel),
        u = $.utils;
 
   if (this.level < this.baddies.length) {
        this.levelData = {
            'baddies': [this.baddies[this.level]],
            'spawnInterval': 200,
            'powerUp': powerUp
        }; 
   } else {
        baddies.push(u.rndArray(this.baddies));
        baddies.push(u.rndArray(this.baddies));
            this.levelData = {
            'baddies': baddies,
            'spawnInterval': 100,
            'powerUp': powerUp
        }; 
   }

   this.tick = 0;

   this.level += 1;

};

