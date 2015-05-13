var expect = require("expect.js");
var ivd    = require("..");


describe(__filename + "#", function() {

  it("can render a component", function() {

    function Component(section, vnode) {
      this.attributes = {};
      this.section    = section;
      this.template   = ivd.template(vnode);
      this.view       = this.template.view();
      this.section.appendChild(this.view.render());
    }

    Component.prototype.setAttribute = function(name, value) {
      this.attributes[name] = value;
    }

    Component.prototype.update = function(context) {
      this.view.update(context);
    }

    var tpl = ivd.template(ivd.element(Component, void 0, ivd.element("span", void 0, ivd.dynamic(ivd.text(), function(ref, context) {
      ref.replaceText(context.message);
    }))));

    var v = tpl.view();
    v.update({ message: "a" });
    expect(v.render().toString()).to.be("<span>a</span>");
  });

});
