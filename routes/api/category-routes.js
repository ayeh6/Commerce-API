const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Product,
                }
            ]
        });
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const category = await Category.findOne({
            include: [
                {
                    model: Product,
                }
            ],
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(category);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.post('/', (req, res) => {
    // create a new category
    try {

    } catch(error) {
        res.status(500).json(error);
    }
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    try {
        await Category.update(
            res.body,
        );
        res.status(200).json("success");
    } catch(error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    try {
        await Category.destroy({
            where: {
                id: req.params.id,
            }
        });
    }
});

module.exports = router;
