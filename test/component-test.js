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

    var tpl = ivd.template(ivd.element("component", void 0, ivd.element("span", void 0, ivd.dynamic(ivd.text(), function(ref) {
      this.update = function(context) {
        ref.replaceText(context.message);
      };
    }))), { components: { component: Component }});

    var v = tpl.view();
    v.update({ message: "a" });
    expect(v.render().toString()).to.be("<span>a</span>");
  });

  it("can dynamically change component attributes", function() {
    function Component(section) {
      this.attributes = {}
      this.node = section.document.createTextNode("");
      section.appendChild(this.node);
    };

    Component.prototype.setAttribute = function(name, value) {
      this.attributes[name] = value;
    };

    Component.prototype.update = function(context) {
      this.node.replaceText(this.attributes.message);
    };

    var tpl = ivd.template(ivd.dynamic(ivd.element("component"), function(ref) {
      this.update = function(context) {
        ref.setAttribute("message", context.message);
      };
    }), { components: { component: Component }});

    var v = tpl.view({ message: "Hello World" });
    expect(v.render().toString()).to.be("Hello World");
    v.update({ message: "Blarg" });
    expect(v.render().toString()).to.be("Blarg");
  });

  xit("can embed a component within a component");
});
