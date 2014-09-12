$.Sprite = function(g, x, y) {

        this.game = g;
        this.x = x || 0;
        this.y = y || 0;
        this.speed = 4;
        this.scale = 2;
        this.explodes = false;
        this.remove = false;
        this.group = '';

        this.vx = 0;
        this.vy = 0;
};

$.Sprite.prototype.mkImg = function(name) {
    this.img = this.game.imgs[name+'_'+this.scale];

    this.w = this.img.width;
    this.h = this.img.height;

    this.cx = this.x + (this.w / 2);
    this.cy = this.y + (this.y / 2);
};


$.Sprite.prototype.outOfBounds = function() {
    return (this.x < 0 || 
                this.y < 0 || 
                this.x > this.game.w || 
                this.y > this.game.h);

};

$.Sprite.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    this.remove = this.outOfBounds();
};


$.Sprite.prototype.render = function() {

    this.game.ctx.drawImage(this.img, this.x, this.y);

};


$.Sprite.prototype.rotate = function(img, angle) {

    var c = document.createElement('canvas'),
        ctx = c.getContext('2d'),
        size = Math.max(img.width, img.height) + 6,
        deg =  angle* (180 / Math.PI);

    c.width = size;
    c.height = size;

    ctx.translate(size/2, size/2);
    ctx.rotate(angle + Math.PI/2);
    ctx.drawImage(img, -(img.width/2), -(img.height/2));

    return c;
};

$.Sprite.prototype.hitGroup = function(group) {

    var g = this.game,
        i = g.ents.length;

    while (i--) {
        if (g.ents[i].group === group &&
            this.hit(g.ents[i])
        ) {
            this.doDamage(g.ents[i]);
            g.ents[i].kill();
        } 
    }

};

$.Sprite.prototype.hit = function(o) {

    return !((o.y+o.h-1<this.y) || (o.y>this.y+this.h-1) ||
             (o.x+o.w-1<this.x) || (o.x>this.x+this.w-1));
    
};


$.Sprite.prototype.doDamage = function(val) {
        this.health -= val; 
};


$.Sprite.prototype.preKill = function() {
    var g = this.game;
    g.score += this.scale || 1;
    g.sfxPlay('explode');
};


$.Sprite.prototype.kill = function() {

    this.preKill();
    var g = this.game;

    this.remove = true; 

    if (this.explodes) {
        g.explode.init(this.scale * 2, this.x, this.y, 5);
        g.ents.push(new $.Explosion(g, {
            scale: this.scale * 2,
            x: this.x,
            y: this.y
        }));
    }

};


$.Sprite.prototype.getTarget = function(n) {

    n = this.game.getByName(n);
    return n[~~( Math.random() * n.length )];
};





