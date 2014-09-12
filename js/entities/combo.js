
$.Combo = function(g, o) {
  $.Sprite.call(this, g);
  this.game = g;


    this.vx = 0;
    this.vy = -1.5;
    this.c = o.c;
    this.o = 1;
    this.font = o.font || g.fonts.h1_p;

    this.x = g.stringW(this.c, this.font) || 50;
    this.y = g.h / 2;

    this.name = 'msgs';
};



$.Combo.prototype = new $.Sprite();
$.Combo.prototype.constructor = $.Sprite;


$.Combo.prototype.update = function(o) {
    this.y += this.vy;
    this.vy *= 1.01;
    if (this.y < 0) {
        this.remove = true;
    }
};



$.Combo.prototype.render = function(o) {
    var g= this.game;
    g.drawString(this.c, this.font, this.x, this.y);
};
