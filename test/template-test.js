var expect = require("expect.js");
var ivd    = require("..");


describe(__filename + "#", function() {

  it("can freeze a template", function() {
    var tpl = ivd.template(ivd.text("Hello World"));
  });

  it("can create a view", function() {
    var tpl = ivd.template(ivd.text("Hello World"));
    var v = tpl.view();
    expect(v.render().toString()).to.be("Hello World");
  });
});
