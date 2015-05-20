// basic example of how we can accomplish an "isomprohic" template engine
// by hydrating a pre-existing DOM element. First need to take the virtual DOM
// and feed it back into the

var tpl = template(element("div"), function(ref, context) {
  ref.innerHTML = "Hello World!";
}), options);

var div = document.createElement("div");
div.innerHTML = "div";


// attach to an existing dom element
var view = tpl.attach(div);


// problems start to arrise when introducing custom components. Take a Repeat component for
// example

function Repeat(vnode) {
  this._childTemplate = template(vnode);
  this._children = [];
}

Repeat.prototype.setAttribute(k, v) {
  this[k] = v;
}

Repeat.prototype.update = function(ref, context) {
  for (var i = this.count; i--;) {

  }
}
