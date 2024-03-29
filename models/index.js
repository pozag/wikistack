const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const generateSlug = title => {
   return title.replace(/[\W\s]+/g, '_');
}

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.BOOLEAN,
            defaultValue: false}
});

Page.beforeValidate(page => {
    page.slug = generateSlug(page.title);
});

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING,
           allowNull: false,
           isEmail: true }
});

const models = {
  User,
  Page
}

module.exports = {
  db,
  models
}

