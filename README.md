# Yeh Mart API

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

The challenge of this assignment is to create a API backend for an e-commerce site using Express and Sequelize to interface with mySQL.

### User Story

AS A manager at an internet retail company  
I WANT a back end for my e-commerce website that uses the latest technologies  
SO THAT my company can compete with other e-commerce companies

### Acceptance Criteria

GIVEN a functional Express.js API  
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file  
THEN I am able to connect to a database using Sequelize  
WHEN I enter schema and seed commands  
THEN a development database is created and is seeded with test data  
WHEN I enter the command to invoke the application  
THEN my server is started and the Sequelize models are synced to the MySQL database  
WHEN I open API GET routes in Insomnia Core for categories, products, or tags  
THEN the data for each of these routes is displayed in a formatted JSON  
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core  
THEN I am able to successfully create, update, and delete data in my database

### Links

- Solution URL: [https://github.com/ayeh6/Yeh-Mart-API](https://github.com/ayeh6/Yeh-Mart-API)
- Demonstration Video: [Video Link](https://drive.google.com/file/d/1-RizMACUS1EckVKRaFzbiW9QaW-Hq0YT/view?usp=sharing)

## My process

### Built with

- Javascript
- mySQL
- Node
- Express
- Sequelize

### What I learned

Doing this assignment after Project 2, I actually didn't know Sequelize can be used without async with the then/catch paths. This does make some routes and queries a bit more difficult. Especially this one below where the given logic for updating tags actually doesn't consider if a product has no tags, so it ends up returning 400 even though it is a success. Had to add a if condition checking for tag lengths being 0.

```js
router.put('/:id', (req, res) => {
    // update product data
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((product) => {
        // find all associated tags from ProductTag
        return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
        // get list of current tag_ids
        console.log(productTags);
        if(productTags.length === 0) {
         res.status(200).json("success");
         return;
        }
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
                return {
                    product_id: req.params.id,
                    tag_id,
                };
            });
        // figure out which ones to remove
        const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

        // run both actions
        return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
        ]);
    })
    .then((updatedProductTags) => res.status(200).json(updatedProductTags))
    .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
    });
});
```

### Continued development

As for continued development, probably turn all the then/catches into try/catches with async/await to have more cleaner code.

### Useful resources

- [Offload](https://github.com/ayeh6/Offload) - Took a lot of looking back on this assignment to understand how to use Sequelize.

## Author

- Website - [Andrew Yeh](https://ayeh6.github.io/Yeh-Andrew-Portfolio-Website/)
- LinkedIn - [/in/ayeh6](https://www.linkedin.com/in/ayeh6/)
