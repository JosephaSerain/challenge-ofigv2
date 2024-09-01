const client = require("./database");

const dataMapper = {
  getAllFigurines: async () => {
    const sql = "SELECT * FROM figurine;";
    const result = await client.query(sql);
    return result.rows;
  },

  getOneFigurine : async (figurineId)=> {
    const sql = `SELECT * FROM figurine WHERE id = ${figurineId}`;
    const result = await client.query(sql);
    return result.rows[0];
  },

  getFigurineReviews : async (figurineId)=> {
    const sql = `SELECT * FROM review WHERE figurine_id = ${figurineId}`
    const result = await client.query(sql);
    return result.rows;
  }
};

module.exports = dataMapper;