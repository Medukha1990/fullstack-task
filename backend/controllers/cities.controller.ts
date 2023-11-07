import db from "../models";
const Cities = db.cities;
const Op = db.Sequelize.Op;

type City = {
  id: number;
  cityName: string;
  count: string;
};

type CityData = {
  cities: [City];
  rows: {
  cities: City
  uniqno: number,
  isNewRecord: boolean
  }
  count: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
};

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data: CityData, page: number, limit: number) => {
  const { count: totalItems, rows: cities } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, cities, totalPages, currentPage };
};

class CitiesController {

  update(req: any, res: any) {
    const {id, count} = req.body
    

    Cities.update({ count }, {
      where: { id: id },
      returning: true,
      plain: true
    })
      .then((num: any) => {
        if (num[1]?.dataValues?.id) {
          res.status(200).send({
           data: num[1].dataValues
          });
        } else {
          res.send({
            message: `Cannot update city with id=${id}. Maybe city was not found or req.body is empty!`
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Error updating City with id=" + id
        });
      });
  };

  findAll(req: { query: { cityName: string; page: number; size: number; } }, res: any) {
    const {cityName: title, page, size} = req.query;
    var condition = title ? { cityName: { [Op.like]: `%${title}%` } } : null;

    const { limit, offset } = getPagination(page, size);

  Cities.findAndCountAll({ where: condition, limit, offset })
    .then((data: CityData) => {
      const response = getPagingData(data, page, limit);
      res.status(200).send(response);
    })
    .catch((err: { message: string }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cities.",
      });
    });
  }


  delete (req: { body: { id: any; } }, res: any) {
    const {id} = req.body
  
    Cities.destroy({
      where: { id: id }
    })
      .then((num: number[]) => {
  
        if (num[0] === 1) {
          res.status(200).send({
            message: `City with id=${id} was deleted successfully!`
          });
        } else {
          res.send({
            message: `Cannot delete City with id=${id}. Maybe City was not found!`
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: "Could not delete City with id=" + id
        });
      });
  };
}





export default new CitiesController()

