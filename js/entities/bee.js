$.Bee = function(g) {

    $.Sprite.call(this, g);
    this.game = g;
    this.name = 'bee';

    this.power = 0;
    this.powerMax = 30;

    this.scale = 4;
    this.mkImg('bee');
    this.shadow = g.imgs.bee_shadow_4;
    this.x = this.game.w / 2 - (this.img.width / 2);
    this.y = this.game.h / 2 - (this.img.height / 2) + 120;

    this.cx = this.x + (this.img.width / 2);
    this.cy = this.y + (this.img.height / 2);

    this.angle = 0;
};

$.Bee.prototype = new $.Sprite();
$.Bee.prototype.constructor = $.Sprite;



$.Bee.prototype.render = function() {

    var g = this.game,
        deg, angle; 

    this.power = g.input.power;


    if  (g.input.down && this.power < this.powerMax) {
        this.power += g.chargeSpeed;
    }

    if (this.power > this.powerMax) {
        this.power = this.powerMax;
    }

    g.ctx.fillStyle = '#000';
    g.ctx.strokeRect(130, 40, this.powerMax * 2, 10);
    g.ctx.fillStyle = '#c20';
    g.ctx.fillRect(130, 40, this.power * 2, 10);
    g.ctx.fillStyle = 'rgba(255,255,255,0.15)';
    g.ctx.fillRect(130, 45, this.power * 2, 5);
    g.ctx.globalAlpha = 1;

    angle = g.input.getAngle(this.cx, this.cy);
    this.angle = angle;

    if (this.angle > 0) {
        this.angle *= -1;
    }

    if (this.angle < -2.6) {
        this.angle = -2.6;
    } else if (this.angle > -0.4) {
        this.angle = -0.4;
    }

    this.hover = ~~( Math.sin(g.tick * 0.5) + 0.5 );
    g.ctx.globalAlpha = 0.3;
    g.ctx.drawImage(this.rotate(this.shadow, this.angle), this.x + 3, this.y  + 5);
    g.ctx.globalAlpha = 1;
    g.ctx.drawImage(this.rotate(this.img, this.angle), this.x, this.y  + this.hover);

};
