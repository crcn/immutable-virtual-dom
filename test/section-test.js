var createSection = require("../lib/section");
var expect        = require("expect.js");
var document      = require("nofactor");

describe(__filename + "#", function() {

  describe("nodes", function() {

    it("can be created", function() {
      var section = createSection(document, document.createElement("div"));
      expect(section.node.nodeType).to.be(3);
    });

    it("can create a marker", function() {
      var el = document.createElement("div");
      var sectNode = document.createElement("div");
      el.appendChild(sectNode);
      var section = createSection(document, sectNode);
      var marker = section.createMarker();
      expect(marker.path.length).to.be(1);
    });

    it("can create a section from a marker", function() {
      var el = document.createElement("div");
      var sectNode = document.createElement("div");
      el.appendChild(sectNode);
      var section = createSection(document, sectNode);
      var marker = section.createMarker();
      var section2 = marker.createSection(el);
      expect(section2.node).to.be(sectNode);
    });

    it("can append a node to the section", function() {
      var el = document.createElement("div");
      var section = createSection(document, el);
      section.appendChild(document.createTextNode("Hello World"));
      expect(section.render().toString()).to.be("<div>Hello World</div>");
    });
  });

  describe("fragments", function() {
    it("can be created", function() {
      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode("a"));
      frag.appendChild(document.createTextNode("b"));
      var section = createSection(document, frag);
      expect(section.node.nodeType).to.be(11);
    });

    xit("can create a marker", function() {
      var el = document.createElement("div");
      var sectNode = document.createElement("div");
      el.appendChild(sectNode);
      var section = createSection(document, sectNode);
      var marker = section.createMarker();
      expect(marker.path.length).to.be(1);
    });

    xit("can create a section from a marker", function() {
      var el = document.createElement("div");
      var sectNode = document.createElement("div");
      el.appendChild(sectNode);
      var section = createSection(document, sectNode);
      var marker = section.createMarker();
      var section2 = marker.createSection(el);
      expect(section2.node).to.be(sectNode);
    });

    xit("can append a node to the section", function() {
      var el = document.createElement("div");
      var section = createSection(document, el);
      section.appendChild(document.createTextNode("Hello World"));
      expect(section.render().toString()).to.be("<div>Hello World</div>");
    });
  });
});
