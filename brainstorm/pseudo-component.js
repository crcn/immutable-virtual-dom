function Repeat(vnode) {
  this.childTemplate = template(vnode.childNodes);
  this._children     = [];
}

RepeatComponent.prototype.setAttribute = function(name, value) {
  this[name] = value;
}

RepeatComponent.prototype.update = function(ref, context) {

  for (var i = 0, n = this.amount; i < n; i++) {
    var child;

    if (i > this._children.length) {
      child = this.childTemplate.view();
      ref.appendChild(child.node);
      this._children.push(view);
    } else {
      child = this._children[i];
    }

    child.update(context);
  }

}


var vel = element(Repeat, { amount: 100 }, text("hello"));
