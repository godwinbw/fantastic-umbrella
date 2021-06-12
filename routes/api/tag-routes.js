const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  console.log("...finding all tags");
  Tag.findAll({
    attribute: ["id", "tag_name"],
    order: [["id", "ASC"]],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        include: [
          {
            model: Category,
            attributes: ["category_name"],
          },
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
        through: {
          model: ProductTag,
          attributes: [],
        },
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
  console.log("...finding a tag by id");
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attribute: ["id", "tag_name"],
    order: [["id", "ASC"]],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
        include: [
          {
            model: Category,
            attributes: ["category_name"],
          },
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
        through: {
          model: ProductTag,
          attributes: [],
        },
        as: "products",
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No tag found with this id" });
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
  // create a new tag
  console.log("...creating a new tag");
  // expects { tag_name: 'golden' }
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  console.log("...updating a tag by id");
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No tag found with this id" });
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
  // delete on tag by its `id` value
  console.log("...deleting a tag by id");
  //res.status(200).json("<h1>We did a delete!</h1>");
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No tag found with this id" });
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
