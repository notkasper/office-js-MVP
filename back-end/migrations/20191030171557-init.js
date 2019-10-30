module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      creator: Sequelize.STRING,
      formal_name: Sequelize.STRING,
      informal_name: Sequelize.STRING,
      phone_number: Sequelize.BIGINT,
      mobile_number: Sequelize.BIGINT,
      email: Sequelize.STRING,
      work_function: Sequelize.UUID,
      department: Sequelize.UUID,
      establishment: Sequelize.UUID,
      extra_text: Sequelize.STRING
    });
    await queryInterface.createTable('establishments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING
    });
    await queryInterface.createTable('departments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING
    });
    await queryInterface.createTable('workFunctions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING
    });
    await queryInterface.createTable('aanhefs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING
    });
    await queryInterface.createTable('groetOpties', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profile');
    await queryInterface.dropTable('establishments');
    await queryInterface.dropTable('departments');
    await queryInterface.dropTable('workFunctions');
    await queryInterface.dropTable('aanhefs');
    await queryInterface.dropTable('groetOpties');
  }
};
