var expect = require("expect.js");
var ivd    = require("..");
var doc    = require("nofactor");


describe(__filename + "#", function() {

  it("can be created", function() {
      ivd.root();
  });

  it("can find references", function() {

    var tpl = ivd.template(ivd.root(ivd.element("div", {}, ivd.reference("ref1", ivd.text()), ivd.reference("ref2", ivd.text())), function(refs, context) {
      refs.ref1.nodeValue = context.a;
      refs.ref2.nodeValue = context.c;
    }));

    var v = tpl.view({ a: "b", c: "d" });

    expect(v.render().toString()).to.be("<div>bd</div>");
  });

  it("can reference a component", function() {

    function Component(section, vnode) {
      this.node = section.document.createTextNode("");
      section.appendChild(this.node);
    }

    Component.prototype.update = function() {
      this.node.nodeValue = this.nodeValue;
    }

    var tpl = ivd.template(ivd.root(ivd.reference("ref1", ivd.element("component")), function(refs, context) {
      refs.ref1.nodeValue = context.a;
    }), {
      components: {
        component: Component
      }
    });

    var v = tpl.view({ a: "b" });
  });
});
