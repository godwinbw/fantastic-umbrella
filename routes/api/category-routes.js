const router = require("express").Router();
const { Category, Product, Tag, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log("...finding all categories");
  Category.findAll({
    attribute: ["id", "category_name"],
    order: [["id", "ASC"]],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        include: [
          {
            model: Tag,
            attributes: ["id", "tag_name"],
            through: {
              model: ProductTag,
              attributes: [],
            },
            as: "tags",
          },
        ],
        as: "products",
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log("...finding a category by id");
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attribute: ["id", "category_name"],
    order: [["id", "ASC"]],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        include: [
          {
            model: Tag,
            attributes: ["id", "tag_name"],
            through: {
              model: ProductTag,
              attributes: [],
            },
            as: "tags",
          },
        ],
        as: "products",
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  console.log("...creating a new category");
  // expects { category_name: 'Pants' }
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  console.log("...updating a category by id");
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  console.log("...deleting a category by id");
  //res.status(200).json("<h1>We did a delete!</h1>");
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
