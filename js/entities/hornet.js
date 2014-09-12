$.Hornet = function(g) {

  $.Sprite.call(this);
    this.game = g;

    var r = g.w,
        target = this.getTarget('hive') || g.p1;

    this.name = 'hornet';
    this.group = 'baddies';
    this.scale = ~~(Math.random() * 3) + 2;
    this.explodes = true;
    this.x = target.cx;
    this.y = -30;

    this.mkImg('hornet');
    this.shadow = g.imgs['hornet_shadow_'+this.scale];

    this.vx = 0;
    this.vy = ~~(Math.random() * 1) + 1;

};

$.Hornet.prototype = new $.Sprite();
$.Hornet.prototype.constructor = $.Sprite;


$.Hornet.prototype.update = function() {

    this.x += this.vx;
    this.y += this.vy;


    if (!this.remove && this.y > ( this.game.h + this.w )) {
        this.remove = true;
    }

};

$.Hornet.prototype.render = function() {
    var g = this.game;
    g.ctx.globalAlpha = 0.2;
    g.ctx.drawImage(this.shadow, this.x + 5, this.y - 6);
    g.ctx.globalAlpha = 1;
    g.ctx.drawImage(this.img, this.x, this.y);
};






