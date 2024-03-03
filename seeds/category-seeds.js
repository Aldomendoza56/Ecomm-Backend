const { Category } =require('../models');

const categoryData = [
  { category_name: 'Shirts' },
  { category_name: 'Shorts' },
  { category_name: 'Music' },
  { category_name: 'Hats' },
  { category_name: 'Shoes' }
];

const seedCategories = async () => {
  try {
    await Category.sync(); // Create the Category table if it doesn't exist
    await Category.bulkCreate(categoryData);
    console.log('Category seed data inserted!');
  } catch (err) {
    console.error('Error inserting category seed data:', err);
  }
};

module.exports = seedCategories;