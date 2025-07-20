export const buildQueryParams = (filters) => {
  const query = {
    page: filters.page,
    limit: filters.limit,
  };

  if (filters.transmission) query.transmission = filters.transmission;
  if (filters.engine) query.engine = filters.engine;
  if (filters.form) query.form = filters.form;
  if (filters.equipment && filters.equipment.length > 0) {
    filters.equipment.forEach((item) => {
      query[item] = true;
    });
  }

  if (filters.location) query.location = filters.location;

  return query;
};
