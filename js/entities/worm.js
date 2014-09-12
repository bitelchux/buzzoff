$.Worm = function(g) {
  $.Sprite.call(this);
  this.game = g;

    var r = g.w,
        target = this.getTarget('hive') || g.p1;

    this.name = 'worm';
    this.group = 'baddies';
    this.scale = 4;
    this.explodes = true;
    this.angle = Math.random()*Math.PI*2;
    this.x = ( Math.random() * (g.w / 3) ) + g.cx;
    
    this.y = 0;

    this.mkImg('wormh');
    this.b = g.imgs['worm_'+this.scale];
    this.bLen = 3;

    // this.vx = 0.5 + ~~(Math.random() * 1);
    // this.vy = 0.5 + ~~(Math.random() * 1);

    this.A = 0;
    this.B = (( Math.random() * 200 ) + 100 )  * -1;
    this.C = 1;
    this.D = 0;
    this.E = (Math.random() * 50) + 50;
    this.F = ( Math.random() * 50 ) + 50;
    this.G = Math.random() * 1;
    this.H = Math.PI/2;

    this.pos = [];
    this.t = 0;
};

$.Worm.prototype = new $.Sprite();
$.Worm.prototype.constructor = $.Sprite;

$.Worm.prototype.render = function() {
    var i = 0, prev;
    for (i = 1; i <= this.bLen; i += 1) {
        prev = this.prevPos(( this.w / 2 ) * i);
        this.game.ctx.drawImage(this.b, prev.x, prev.y);
    }

    this.game.ctx.drawImage(this.img, this.x, this.y);
};

$.Worm.prototype.update = function() {


    if (this.y + this.h > this.game.h) {
        this.remove = true;
    }

    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

    this.x += this.vx * 0.005;
    this.y += this.vy * 0.015;

    this.t += 0.05;


    this.pos.push({x: this.x, y: this.y});

};

$.Worm.prototype.prevPos = function(n) {
    return this.pos[this.pos.length - n] || {x: -20, y: -20};
};


// $.Worm.






