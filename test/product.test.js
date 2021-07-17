const app = require("../index");
const chai = require("chai");
const mongoose = require("mongoose");
const chaiHttp = require("chai-http");
const db = require("../config/key");
const Product = require("../models/product");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Products", () => {
  before(function (done) {
    mongoose
      .connect(db.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true, // can create custom index
        useFindAndModify: false,
      })
      .then(() => {
        app.listen(function (err) {
          if (err) {
            return done(err);
          }
          done();
        })();
      });
  });
  describe("GET /readAll", () => {
    // Test to get all Product record
    it("should get all products", (done) => {
      chai
        .request(app)
        .get("/readAll")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });
  });
  describe("GET /read", () => {
    // Test to get all students record
    it("Should get a single product", (done) => {
      const id = "60f1cb26feabdc48c2909a5e";
      chai
        .request(app)
        .get("/readAll")
        .send({ productId: id })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });
    // Test to get single product record

    it("Should not get a single product", (done) => {
      // will cause error as productId is empty
      const id = "";
      chai
        .request(app)
        .get("/read")
        .send({ productId: id })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
  describe("PATCH /update", () => {
    // Test to update product record
    it("should update a product", (done) => {
      const product = {
        productId: "60f29a3d863fec5bb31eeb31",
        updateObject: {
          productName: "MacBook pro",
          unitPrice: 83646,
        },
      };
      chai
        .request(app)
        .patch("/update")
        .send({ ...product })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should not update a product", (done) => {
      // will cause error as productId is not passed
      const product = {
        updateObject: {
          productName: "MacBook pro",
          unitPrice: 83646,
        },
      };
      chai
        .request(app)
        .patch("/update")
        .send({ ...product })
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });

  describe("DELETE /delete", async () => {
    // Test to delete product record
    it("should not delete a product", (done) => {
      // will cause error as productId is not passed
      const product = {};
      chai
        .request(app)
        .delete("/delete")
        .send({ ...product })
        .end((err, res) => {
          res.should.have.status(404);
          return done();
        });
    });
  });

  describe("POST /create", () => {
    // Test to create  products record
    it("should create a product", (done) => {
      const product = {
        productName: "MacBook pro",
        unitPrice: 83646,
        qtyPerUnit: 100,
        unitInStock: 100,
        disContinued: false,
        categoryName: "Electronics",
      };
      console.log(product);
      chai
        .request(app)
        .post("/create")
        .send({ ...product })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("should not create a product", (done) => {
      const product = {
        unitPrice: 83646,
        qtyPerUnit: 100,
        unitInStock: 100,
        disContinued: false,
        categoryName: "Electronics",
      };
      chai
        .request(app)
        .post("/create")
        .send({ ...product })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
