const setHATEOAS = (inventario, page = 1, limit = 4) => {
  try {
    const totalPages = Math.ceil(inventario.length / limit);
    const results = inventario
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map((j) => {
        return {
          name: j.nombre,
          href: `/joyas/joyas/${j.id}`,
        };
      });

    const totalJoyas = inventario.length;
    const totalStock = inventario.reduce((total, j) => total + j.stock, 0);

    const next = page < totalPages ? page + 1 : null;
    const prev = page > 1 && page <= totalPages ? page - 1 : null;

    const HATEOAS = {
      totalJoyas,
      totalStock,
      totalPages,
      limit,
      page,
      next,
      prev,
      results,
    };
    return HATEOAS;
  } catch (e) {
    console.log(
      "Error al realizar HATEOAS",
      "Code: ",
      e.code,
      "Message: ",
      e.message
    );
    throw new Error(e);
  }
};

module.exports = { setHATEOAS };
