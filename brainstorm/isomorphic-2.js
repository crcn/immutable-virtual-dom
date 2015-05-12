function Repeat(section, vnode) {
  this.section = section;
  this.ctemplate   = template(vnode);
}

Repeat.prototype.update = function(context) {
  for (var i = context.count; i--;) {
    this.section.appendChild(this.vnode.cloneNode());
  }
}


// 1. set view ref on the virtual element
// 2. traverse virtual DOM & replace vnodes with real nodes
var vel = element("div", text());

// problem is document fragments

var v = view(vel);
vel.view = v;


var m   = link(view, vel); // vel.setAttribute("view", view)



view(vel);
