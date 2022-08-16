const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    await Category.findAll({
        include: [
            {
                model: Product,
            }
        ]
    })
    .then((products) => res.status(200).json(products))
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);
    });
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findOne({
        include: [
            {
                model: Product,
            }
        ],
        where: {
            id: req.params.id,
        }
    })
    .then((category) => {
        res.status(200).json(category);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
    // create a new category
    Category.create(req.body)
    .then((category) => {
        res.status(200).json("success", category);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(
        req.body,
    )
    .then((category) => {
        res.status(200).json("success", category);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id,
        }
    })
    .then((category) => {
        res.status(200).json("success", category);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

module.exports = router;
