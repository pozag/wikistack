const express = require('express');
const router = express.Router();

const allPages = require('../views/main');
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');

const { models } = require("../models/index");

const Page = models.Page;

router.get('/', (req, res) => {
    res.send(allPages(''));
});

router.post('/', async (req, res, next) => {
    const page = new Page({
	title: req.body.title,
	content: req.body.content,
    });

    try {
	await page.save();
	res.redirect('/');
    } catch (error) { next(error) }
});

router.get('/add', (req, res) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res) => {
    const allPages = await Page.findAll();
    console.log("allpages", allPages);
    console.log("slug", req.params.slug);
    const foundPage = await Page.findOne({
	where: { slug: req.params.slug }
    });
    console.log("found Page", foundPage);
    
    res.send(wikiPage(foundPage.title, foundPage.author));
});

module.exports = router;

