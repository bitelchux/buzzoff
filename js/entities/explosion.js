
$.Explosion =  function(game, o) {
    $.Sprite.call(this, game);
    this.game = game;

    this.name = 'explosion';

    this.scale = o.scale || 8;
    this.frames = 7;
    this.frame = 0;
    this.img = new Image();
    this.img.src = $.data.i.explosion;

    this.w = this.img.width * this.scale / ( this.frames + 1 );
    this.h = this.img.height * this.scale;

    this.img = $.utils.resize(this.img, this.scale, false);
    this.animTick = 0;
    this.animReset = 2;

    this.x = o.x - ( this.w / 2 );
    this.y = o.y - ( this.h / 2 );

    this.vx = 0;
    this.vy = 0;
};

$.Explosion.prototype = new $.Sprite();
$.Explosion.prototype.constructor = $.Sprite;



$.Explosion.prototype.update = function() {

    if (this.animTick > this.animReset) {
        this.animTick = 0;
        this.frame += 1;
    }

    if (this.frame > this.frames) {
        this.remove = true;
        this.frame = this.frames;
    }

    this.animTick += 1;
};

$.Explosion.prototype.render = function() {

    var g = this.game;

    g.ctx.drawImage(this.img, 0 + (this.frame * this.w), 0, this.w, this.h, this.x, this.y, this.w, this.h);


};
