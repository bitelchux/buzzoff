$ = {};
$.Game = function(id, w, h) {

	this.id = id;
	this.w = w;
	this.h = h;

    this.cx = w / 2;
    this.cy = h / 2;

	this.score = 0;
	this.hiScore = localStorage.getItem('hiScore') || 0;
    this.tick = 0;
    this.mobile =  !!('ontouchstart' in window);

    this.bgs = {};
    this.imgs = {};
    this.fonts = {};
	this.ents = [];
    this.sfx = {};
    $.u = $.utils;


};

$.Game.prototype.boot = function() {

	var self = this, 
        listen = window.addEventListener;

	this.c = $.u.getId(this.id);
	this.ctx = this.c.getContext('2d');
    this.l = $.u.getId('l');

	this.c.addEventListener('mozAnimationEnd', function(e) {
        self.c.className = '';
    }, false);
	this.c.addEventListener('webkitAnimationEnd', function(e) {
        self.c.className = '';
    }, false);

	listen('resize', function() {
		self.scale();
	}, false);

    this.input = new $.Input(this);

    this.load = new $.Load(this);
    this.explode = new $.Emitter(this);
        
};


$.Game.prototype.init = function() {

    var self = this;

    this.c.style.display = 'block';
    this.l.style.display = 'none';
	this.scale();
    this.favicon();


    this.changeState('Intro');

    (function gameLoop() {
            self.loop();
            requestAnimationFrame(gameLoop, this.c);
    })();
};

$.Game.prototype.favicon = function() {


  
    var canvas = document.createElement('canvas');
    canvas.width = 16;canvas.height = 16;
    var ctx = canvas.getContext('2d');
    var i = this.imgs.bee_2;

    try {
        ctx.drawImage(i, 0, 0);
    } catch (e) {
        // window.location.href=window.location.href;
        return;
    }

    var l = document.createElement('link');
    l.type = 'image/x-icon';
    l.rel = 'shortcut icon';
    l.href = canvas.toDataURL("image/x-icon");
    document.getElementsByTagName('head')[0].appendChild(l);

};


$.Game.prototype.changeState = function(state) {

    this.ents = [];
    this.tick = 0;
    this.input.down = false;
	this.state = new $[state](this);

};


$.Game.prototype.move = function(e) {

	var p = this.getPos(e);

	this.mx = p.x;
	this.my = p.y;

	this.angle = this.getAngle(this.w /2, this.h / 2);

	
};

$.Game.prototype.loop = function() {

    this.tick += 1;

    this.fadeText = Math.sin(this.tick * 0.05) + 1;
    
	this.state.update();
	this.state.render();

    this.input.updatePower();

};


$.Game.prototype.getAngle = function(x, y) {

	var dx = this.mx - x;
	var dy = this.my - y;
	return Math.atan2(dy, dx);
};


$.Game.prototype.scale = function() {

	var winH = window.innerHeight,
			ratio = this.w / this.h,
			w2 = winH * ratio,
			scale = w2 / this.w;

    if (this.mobile && winH < window.innerWidth) {
        this.l.style.display = 'block';
        $.u.getId('h').innerHTML = 'Rotate Device';
        this.c.style.display = 'none';
    } else {
        this.l.style.display = 'none';
        this.c.style.display = 'block';
    }


	this.c.width = this.w;
	this.c.height = this.h;

    this.cx = this.w / 2;
    this.cy = this.h / 2;

	this.c.style.width = ~~(w2)+ 'px';
	this.c.style.height = ~~(winH) + 'px';


};


$.Game.prototype.makeSprite = function(n, o) {

    var s = new $[n]();
    s.init(this, o);
    return s;

};


$.Game.prototype.stringW = function(s, f){
    if (!f.f) {
        return;
    }

    var i, w = 0;
    s=s.split('');
    for (i = 0; i < s.length; i += 1) {
        w += f.w[i] * f.scale;
    }

    return this.w / 2 - (w / 2);


};

// adapted from http://www.benjoffe.com/code/dev/canvas_fonts/example
$.Game.prototype.drawString = function(s, f, x, y){

	s = s.toUpperCase();
    f.scale = f.scale || 1;

    //last min ff workaround
    if (!f) {
        return;
    }

	var z=x,t,i,j,
        xStart = x;
	if(!f.f) {
		f.f=[t=0],i=0,j=f.w.length;
		while(++i<j) {
			f.f[i]=t+=f.w[i-1] * f.scale;
		}
	}
	s=s.split(''),i=0,j=s.length;
	while(i<j) {
        if((t=f.c.indexOf(s[i++]))>=0) {
            this.ctx.drawImage(
                    f,
                    f.f[t],0,
                    f.w[t] * f.scale, f.height,
                    x,y,
                    f.w[t] * f.scale,f.height);
            x+=f.w[t] * f.scale;
        }
	
	}
    

};


$.Game.prototype.getByName = function(name) {

    var e = this.ents, i = e.length,
        group = [];

    while(i--) {
        if (e[i].name === name) {
            group.push(e[i]);
        }
    }

    return group;

};


$.Game.prototype.getByGroup = function(name) {

    var e = this.ents, i = e.length,
        group = [];

    while(i--) {
        if (e[i].group === name) {
            group.push(e[i]);
        }
    }

    return group;

};


$.Game.prototype.sfxPlay = function(name) {
    try {
        this.sfx[name].play();
    } catch (e) {
        console.log(e);
    }
}
