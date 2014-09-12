$.Skull = function(g) {
  $.Sprite.call(this);
  this.game = g;

    var r = g.w,
        target = this.getTarget('hive') || g.p1;

    this.name = 'skull';
    this.group = 'baddies';
    this.scale = ~~(Math.random() * 3) + 2;
    this.explodes = true;

    this.x = Math.random() * g . w;
    this.y = 0;

    this.mkImg('skull');
    this.t = 0;

    // Adapted from
    // http://www.amazon.com/Professional-HTML5-Mobile-Game-Development/dp/1118301323
    this.A = 0;         // h vel const
    this.B = -100;      // h sin strength
    this.C = 1;         // h sin period
    this.D = 0;         // h sin vel timeshift
    this.E = 30;        // v vel const
    this.F = 200;       // v sin strength
    this.G = 0.5;         // v sin vel period
    this.H = 1;
};

$.Skull.prototype = new $.Sprite();
$.Skull.prototype.constructor = $.Sprite;


$.Skull.prototype.update = function() {

    if (this.y + this.h > this.game.h) {
        this.remove = true;
    }

    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

    this.x += this.vx * 0.015;
    this.y += this.vy * 0.015;

    this.t += 0.05;
};


$.Skull.prototype.render = function() {

    var g = this.game;

    g.ctx.drawImage(this.img, this.x, this.y);


};



