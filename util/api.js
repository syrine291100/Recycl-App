import axios from 'axios';

// Recherche un produit par code-barres (OpenFoodFacts)
export const fetchProductByBarcode = async (barcode) => {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  try {
    const res = await axios.get(url);
    return res.data.product;
  } catch (e) {
    return null;
  }
};

// Tu peux aussi faire une fonction fetch pour la carte (OpenStreetMap ou autre) si besoin
