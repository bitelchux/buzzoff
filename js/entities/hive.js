$.Hive = function(g, o) {
    $.Sprite.call(this, g);
    this.game = g;
    this.name = 'hive';
    this.group = 'hives';


    this.scale = 3;
    this.mkImg('hive');
    this.iHurt = this.game.imgs['hive_hurt_'+this.scale];

    this.x = o.x;
    this.y = o.y;

    this.cx = this.x - (this.img.width / 2);
    this.cy = this.y - (this.img.height / 2);

    this.alpha = 0;


    this.explodes = true;
    this.health = 10;
};

$.Hive.prototype = new $.Sprite();
$.Hive.prototype.constructor = $.Sprite;




$.Hive.prototype.update = function() {
    this.hitGroup('baddies');
};


$.Hive.prototype.render = function() {

    var g = this.game;
    this.game.ctx.drawImage(this.img, this.x, this.y);
    g.ctx.globalAlpha = this.alpha;
    this.game.ctx.drawImage(this.iHurt, this.x, this.y);
    g.ctx.globalAlpha = 1;
};


$.Hive.prototype.repair = function() {

    this.health += 3;
    if (this.health >= 10) {
        this.health = 10;
        this.alpha = 0;
    } else {
        this.alpha = (10 - this.health) / 10;
    }
};

$.Hive.prototype.doDamage = function(o) {

    var g = this.game;
    this.health -= o.scale; 
    g.c.className = 'shake';
    g.sfxPlay('hurt');
    
    this.alpha = (10 - this.health) / 10;

    if (this.alpha >= 1) {
        this.kill();
    }
};
