var ivd    = require("..");
var expect = require("expect.js");

describe(__filename + "#", function() {
  it("can register a custom attribute handler", function() {

    function EventAttribute(ref, key) {
      console.log("OK");
    }

    EventAttribute.prototype.update = function(context) {

    }

    var tpl = ivd.template(ivd.element("div", { onClick: function() { } }), {
      attributes: {
        onClick: EventAttribute
      }
    });

    var v = tpl.view();
    v.render();
  });
});
