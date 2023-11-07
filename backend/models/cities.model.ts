export default (sequelize: any, Sequelize: any) => {
  const Cities = sequelize.define("cities", {
    cityName: {
      type: Sequelize.STRING,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    uuid: {
      type: Sequelize.STRING
    }
  });

  return Cities;
};
