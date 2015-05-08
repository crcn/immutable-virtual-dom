var expect = require("expect.js");
var ivd    = require("..");


describe(__filename + "#", function() {

  it("can create at template from a virtual node", function() {
    var tpl = ivd.template(ivd.text("Hello World"));
  });
});
