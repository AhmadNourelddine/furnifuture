export const createNewProduct = (product) => {
  return {
    type: "CreateNewProduct",
    payload: product,
  };
};

export const deleteCreatedProduct = (product) => {
  return {
    type: "DeleteCreatedProduct",
    payload: product,
  };
};
