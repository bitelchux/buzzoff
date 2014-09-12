
$.Bullet = function(game, o) {
  $.Sprite.call(this, game);

    this.game = game;
	this.angle = o.angle;
	this.x = o.x;
	this.y = o.y;
	this.speed = 4;
	this.group = 'bullets';
	this.name = 'bullet';
	this.remove = false;
    this.power = o.power || 2;
	this.scale =  ~~(( this.power / 3 ) -1) || 2;
    this.w = this.h = this.size;

    this.angle = this.game.p1.angle;
    this.mkImg('sting');
    this.img = this.rotate(this.img, this.angle);
	this.vx = this.speed * Math.cos(this.angle);
	this.vy = this.speed * Math.sin(this.angle);
    this.combo = 0;

    this.max = 9;
};


$.Bullet.prototype = new $.Sprite();
$.Bullet.prototype.constructor = $.Sprite;


$.Bullet.prototype.update = function() {

	this.x += this.vx;
	this.y += this.vy;

	this.remove = this.outOfBounds();
    this.hitGroup('baddies');

    if (this.outOfBounds()) {
        this.kill(); 
    }

};


$.Bullet.prototype.preKill = function (){
    if (this.combo > 1) {
        var g = this.game;
        g.ents.push(new $.Combo(g, {c: 'x ' + this.combo}));

        g.sfxPlay('powerup');
        if (this.combo > g.maxCombo) {
            g.maxCombo = this.combo;
        }
    }
};


$.Bullet.prototype.doDamage = function (){
    if (this.scale < this.max) {
        this.remove = true;
    } else {
        this.combo += 1;
    }
};

