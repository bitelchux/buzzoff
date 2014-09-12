$.Slider = function(game) {

    $.Sprite.call(this, game);
    this.game = game;
    this.name = 'slider';


    this.scale = 6;
    this.mkImg('slider');

    this.x = this.game.w / 2 - (this.img.width / 2);
    this.y = this.game.h / 2 - (this.img.height / 2) + 200;

    this.cx = this.x + (this.img.width / 2);
    this.cy = this.y + (this.img.height / 2);

    this.min = 0;
    this.max = this.game.w - (this.img.width + this.min);
};

$.Slider.prototype = new $.Sprite();
$.Slider.prototype.constructor = $.Sprite;

$.Slider.prototype.update = function() {
    this.x = this.game.input.x - (this.img.width / 2);
    if (this.x < this.min) {
        this.x = this.min;
    }
    if (this.x > this.max) {
        this.x = this.max;
    }
};



$.Slider.prototype.render = function() {
    var g = this.game;

    g.ctx.fillStyle = 'rgba(0,0,0,0.2)';
    g.ctx.fillRect(this.min, this.y, this.max + this.img.width - this.min, this.img.height);
    g.ctx.globalAlpha = 0.7;
    g.ctx.drawImage(this.img, this.x, this.y);
    g.ctx.globalAlpha = 1;
};
