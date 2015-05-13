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

    it("can be cloned", function() {
      var el = document.createElement("div");
      el.appendChild(document.createTextNode("Hello World"));
      var section = createSection(document, el);
      expect(section.clone().render().toString()).to.be("<div>Hello World</div>");
    });

    it("can be removed", function() {
      var el = document.createElement("span");
      el.appendChild(document.createTextNode("Hello World"));
      var section = createSection(document, el);

      var el2 = document.createElement("div");
      el2.appendChild(section.render());
      expect(el2.toString()).to.be("<div><span>Hello World</span></div>");
      section.remove();
      expect(el2.toString()).to.be("<div></div>");

    });
  });

  describe("fragments", function() {
    it("can be created", function() {
      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode("a"));
      frag.appendChild(document.createTextNode("b"));
      var section = createSection(document, frag);
      expect(section.start.nodeType).to.be(3);
      expect(section.end.nodeType).to.be(3);
    });

    it("can create a marker", function() {

      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode("a"));
      frag.appendChild(document.createTextNode("b"));

      var section = createSection(document, frag);
      var marker = section.createMarker();
      expect(marker.startPath.length).to.be(1);
      expect(marker.endPath.length).to.be(1);
    });

    it("can create a section from a marker", function() {

      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode("a"));
      frag.appendChild(document.createTextNode("b"));

      var section = createSection(document, frag);

      var div = document.createElement("div");
      div.appendChild(section.render());
      var marker = section.createMarker();
      var section = marker.createSection(div);

      expect(section.remove().render().toString()).to.be("ab");
    });

    it("can append a node to the section", function() {
      var section = createSection(document, document.createDocumentFragment());
      section.appendChild(document.createTextNode("Hello World"));
      expect(section.render().toString()).to.be("Hello World");
    });

    it("can be cloned", function() {
      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode("a"));
      frag.appendChild(document.createTextNode("b"));

      var section = createSection(document, frag);
      expect(section.clone().render().toString()).to.be("ab");

      var div = document.createElement("div");
      div.appendChild(section.render());
      expect(section.clone().render().toString()).to.be("ab");
    });

    it("can be removed", function() {
      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode("a"));
      frag.appendChild(document.createTextNode("b"));
      var section = createSection(document, frag);
      var div = document.createElement("div");
      div.appendChild(section.render());
      expect(div.toString()).to.be("<div>ab</div>");
      section.remove();
      expect(div.toString()).to.be("<div></div>");
    });
  });
});
