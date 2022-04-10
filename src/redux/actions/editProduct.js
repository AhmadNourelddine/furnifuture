export const editProduct = (product) => {
  return {
    type: "EditProduct",
    payload: product,
  };
};

export const removeProduct = (product) => {
  return {
    type: "RemoveProduct",
  };
};
