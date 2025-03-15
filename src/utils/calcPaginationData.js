// src/utils/calcPaginationData.js

export const calcPaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPrevPage = page !== 1;
  const hasNextPage = Boolean(totalPages - page);

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPrevPage,
    hasNextPage,
  };
};
