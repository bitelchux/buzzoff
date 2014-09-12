$.Powerup = function(g) {

  $.Sprite.call(this);
    this.game = g;

    var r = g.w;

    this.types = ['health', 'firepower', 'bomb'];
    this.name = $.utils.rndArray(this.types);

    this.group = 'powerups';
    this.scale = 4;
    this.explodes = false;
    this.x = g.cx;
    this.y = -30;

    this.mkImg(this.name);

    this.vx = 0;
    this.vy = 0.3 + ~~(Math.random() * 1);

};

$.Powerup.prototype = new $.Sprite();
$.Powerup.prototype.constructor = $.Sprite;


$.Powerup.prototype.update = function() {

    this.x += this.vx;
    this.y += this.vy;
    this.hitGroup('bullets');


    if (!this.remove && this.y > ( this.game.h + this.w )) {
        this.remove = true;
    }

};

$.Powerup.prototype.render = function() {
    var g = this.game;
    g.ctx.drawImage(this.img, this.x, this.y);
};


$.Powerup.prototype.doDamage = function (){
    var g = this.game;

    g.sfxPlay('powerup');
    g.ents.push(new $.Combo(g, {c: this.name, font: g.fonts.pwup}));
    g.explode.init(this.scale * 2, this.x, this.y, 5);
    this.remove = true;

    if (this.name === 'health') {
        this.doHealth();
    } else if (this.name === 'firepower') {
        this.doFirepower();
    } else if (this.name === 'bomb') {
        this.doBomb();
    }
};

$.Powerup.prototype.doHealth = function (){
    var hives = this.game.getByName('hive'),
        i = hives.length;

    while (i--) {
        hives[i].repair();
    }
};


$.Powerup.prototype.doFirepower = function (){

    this.game.chargeSpeed += 1;

};


$.Powerup.prototype.doBomb = function (){
    var baddies = this.game.getByGroup('baddies'),
        i = baddies.length;

    while (i--) {
        baddies[i].kill();
    }

};
