var expect = require("expect.js");
var ivd    = require("..");
var document = require("nofactor");


describe(__filename + "#", function() {

  it("can update a dynamic text block", function() {
    var tpl = ivd.template(ivd.element("span", void 0, ivd.dynamic(ivd.text(), function(ref, context) {
      ref.replaceText(context.message);
    })));

    var v = tpl.view();
    v.update({ message: "a" });
    expect(v.render().toString()).to.be("<span>a</span>");
    v.update({ message: "b" });
    expect(v.render().toString()).to.be("<span>b</span>");

    expect(tpl.view({ message: "c" }).render().toString()).to.be("<span>c</span>");
    expect(v.render().toString()).to.be("<span>b</span>");
  });

  it("can be removed", function() {
    var tpl = ivd.template(ivd.fragment(ivd.element("span"), ivd.element("span")));
    var n = document.createElement("div");
    var v = tpl.view();
    n.appendChild(v.render());
    expect(n.toString()).to.be("<div><span></span><span></span></div>");
    v.remove();
    expect(n.toString()).to.be("<div></div>");
  })

});
