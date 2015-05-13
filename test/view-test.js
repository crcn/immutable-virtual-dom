var expect = require("expect.js");
var ivd    = require("..");


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

});
