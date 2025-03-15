// src/utils/parseFilterParams.js

const parseFavourite = (boolean) => {
  const isString = typeof boolean === 'string';
  if (!isString) return;
  if (boolean.toLowerCase() === 'true') return true;
  if (boolean.toLowerCase() === 'false') return false;
};

const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['home', 'work', 'personal'].includes(type);
  if (isType(type)) return type;
};

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  const parsedFavourite = parseFavourite(isFavourite);
  const parsedType = parseType(type);

  return {
    isFavourite: parsedFavourite,
    contactType: parsedType,
  };
};
