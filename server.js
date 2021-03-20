const express = require("express");
const app = express();
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const router = express.Router();

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const TIMEOUT = 10000;

app.use(express.json())

const quizRouter = require("./routes/quizRouter")
app.use('/quiz', quizRouter)

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


router.get("/is-mongoose-ok", function (req, res) {
  if (mongoose) {
    res.json({ isMongooseOk: !!mongoose.connection.readyState });
  } else {
    res.json({ isMongooseOk: false });
  }
});

const Person = require("./app.js").PersonModel;

router.use(function (req, res, next) {
  if (req.method !== "OPTIONS" && Person.modelName !== "Person") {
    return next({ message: "Person Model is not correct" });
  }
  next();
});

router.post("/mongoose-model", function (req, res, next) {
  // try to create a new instance based on their model
  // verify it's correctly defined in some way
  let p;
  p = new Person(req.body);
  res.json(p);
});

const createPerson = require("./app.js").createAndSavePerson;
router.get("/create-and-save-person", function (req, res, next) {
  // in case of incorrect function use wait timeout then respond
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  createPerson(function (err, data) {
    clearTimeout(t);
    if (err) {
      return next(err);
    }
    if (!data) {
      console.log("Missing `done()` argument");
      return next({ message: "Missing callback argument" });
    }
    Person.findById(data._id, function (err, pers) {
      if (err) {
        return next(err);
      }
      res.json(pers);
      pers.remove();
    });
  });
});

const createPeople = require("./app.js").createManyPeople;
router.post("/create-many-people", function (req, res, next) {
  Person.remove({}, function (err) {
    if (err) {
      return next(err);
    }
    // in case of incorrect function use wait timeout then respond
    let t = setTimeout(() => {
      next({ message: "timeout" });
    }, TIMEOUT);
    createPeople(req.body, function (err, data) {
      clearTimeout(t);
      if (err) {
        return next(err);
      }
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      Person.find({}, function (err, pers) {
        if (err) {
          return next(err);
        }
        res.json(pers);
        Person.remove().exec();
      });
    });
  });
});

const findByName = require("./app.js").findPeopleByName;
router.post("/find-all-by-name", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  Person.create(req.body, function (err, pers) {
    if (err) {
      return next(err);
    }
    findByName(pers.name, function (err, data) {
      clearTimeout(t);
      if (err) {
        return next(err);
      }
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      res.json(data);
      Person.remove().exec();
    });
  });
});

const findByFood = require("./app.js").findOneByFood;
router.post("/find-one-by-food", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  let p = new Person(req.body);
  p.save(function (err, pers) {
    if (err) {
      return next(err);
    }
    findByFood(pers.favoriteFoods[0], function (err, data) {
      clearTimeout(t);
      if (err) {
        return next(err);
      }
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      res.json(data);
      p.remove();
    });
  });
});

const findById = require("./app.js").findPersonById;
router.get("/find-by-id", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  let p = new Person({ name: "test", age: 0, favoriteFoods: ["none"] });
  p.save(function (err, pers) {
    if (err) {
      return next(err);
    }
    findById(pers._id, function (err, data) {
      clearTimeout(t);
      if (err) {
        return next(err);
      }
      if (!data) {
        console.log("Missing `done()` argument");
        return next({ message: "Missing callback argument" });
      }
      res.json(data);
      p.remove();
    });
  });
});

const findEdit = require("./app.js").findEditThenSave;
router.post("/find-edit-save", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  let p = new Person(req.body);
  p.save(function (err, pers) {
    if (err) {
      return next(err);
    }
    try {
      findEdit(pers._id, function (err, data) {
        clearTimeout(t);
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log("Missing `done()` argument");
          return next({ message: "Missing callback argument" });
        }
        res.json(data);
        p.remove();
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  });
});

const update = require("./app.js").findAndUpdate;
router.post("/find-one-update", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  let p = new Person(req.body);
  p.save(function (err, pers) {
    if (err) {
      return next(err);
    }
    try {
      update(pers.name, function (err, data) {
        clearTimeout(t);
        if (err) {
          return next(err);
        }
        if (!data) {
          console.log("Missing `done()` argument");
          return next({ message: "Missing callback argument" });
        }
        res.json(data);
        p.remove();
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  });
});

const removeOne = require("./app.js").removeById;
router.post("/remove-one-person", function (req, res, next) {
  Person.remove({}, function (err) {
    if (err) {
      return next(err);
    }
    let t = setTimeout(() => {
      next({ message: "timeout" });
    }, TIMEOUT);
    let p = new Person(req.body);
    p.save(function (err, pers) {
      if (err) {
        return next(err);
      }
      try {
        removeOne(pers._id, function (err, data) {
          clearTimeout(t);
          if (err) {
            return next(err);
          }
          if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
          }
          console.log(data);
          Person.count(function (err, cnt) {
            if (err) {
              return next(err);
            }
            data = data.toObject();
            data.count = cnt;
            console.log(data);
            res.json(data);
          });
        });
      } catch (e) {
        console.log(e);
        return next(e);
      }
    });
  });
});

const removeMany = require("./app.js").removeManyPeople;
router.post("/remove-many-people", function (req, res, next) {
  Person.remove({}, function (err) {
    if (err) {
      return next(err);
    }
    let t = setTimeout(() => {
      next({ message: "timeout" });
    }, TIMEOUT);
    Person.create(req.body, function (err, pers) {
      if (err) {
        return next(err);
      }
      try {
        removeMany(function (err, data) {
          clearTimeout(t);
          if (err) {
            return next(err);
          }
          if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
          }
          Person.count(function (err, cnt) {
            if (err) {
              return next(err);
            }
            if (data.ok === undefined) {
              // for mongoose v4
              try {
                data = JSON.parse(data);
              } catch (e) {
                console.log(e);
                return next(e);
              }
            }
            res.json({
              n: data.n,
              count: cnt,
              ok: data.ok,
            });
          });
        });
      } catch (e) {
        console.log(e);
        return next(e);
      }
    });
  });
});

const chain = require("./app.js").queryChain;
router.post("/query-tools", function (req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  Person.remove({}, function (err) {
    if (err) {
      return next(err);
    }
    Person.create(req.body, function (err, pers) {
      if (err) {
        return next(err);
      }
      try {
        chain(function (err, data) {
          clearTimeout(t);
          if (err) {
            return next(err);
          }
          if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
          }
          res.json(data);
        });
      } catch (e) {
        console.log(e);
        return next(e);
      }
    });
  });
});


// Error handler
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

// Unmatched routes handler
app.use(function (req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end();
  } else {
    res.status(404).type("txt").send("Not Found");
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

/********************************************
 * DO NOT EDIT THIS FILE
 * the verification process may break
 *******************************************/
