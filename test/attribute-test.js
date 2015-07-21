var ivd    = require("..");
var expect = require("expect.js");

describe(__filename + "#", function() {
  it("can register a custom attribute handler", function() {

    function EventAttribute(ref, key) {

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

  it("can test a custom attribute", function() {

    function av(ref, key, value) {
      ref.setAttribute(key, "set");
    }

    av.test = function(ref, key, value) {
      return value === true;
    };

    var tpl = ivd.template(ivd.fragment(ivd.element("div", { av: true }), ivd.element("div", { av: false })), {
      attributes: {
        av: av
      }
    });

    var v = tpl.view();

    expect(v.render().toString()).to.be('<div av="set"></div><div av="false"></div>');
  });
});
