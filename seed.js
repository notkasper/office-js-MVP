require('colors');
const fs = require('fs');
const path = require('path');
const db = require('./back-end/db');

const seed = async () => {
  try {
    const connection = db.getConnection();

    const establishments = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/establishments.json')));
    const departments = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/departments.json')));
    const workFunctions = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/workFunctions.json')));
    const aanhefs = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/aanhefs.json')));
    const groetOpties = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/groetOpties.json')));

    for (const establishment of establishments) {
      await connection.models.establishments.create(establishment);
    }

    for (const department of departments) {
      await connection.models.departments.create(department);
    }

    for (const workFunction of workFunctions) {
      await connection.models.workFunctions.create(workFunction);
    }

    for (const aanhef of aanhefs) {
      await connection.models.aanhefs.create(aanhef);
    }

    for (const groetOptie of groetOpties) {
      await connection.models.groetOpties.create(groetOptie);
    }

    connection.close();
    console.log('Database seeded'.green.bold);
  } catch (error) {
    console.error(`Error while seeding: ${error}`.red.bold);
  }
};

module.exports = seed;
