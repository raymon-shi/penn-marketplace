const axios = require('axios');

const submitBidListing = async (product, productDescr, tag, imgLink, imageFile) => {
  if (imgLink && imgLink !== '') {
    const formData = new FormData();
    formData.append('product', product);
    formData.append('productDescr', productDescr);
    formData.append('tag', tag);
    formData.append('imageFile', imageFile);
    try {
      const { data } = await axios.post('/item/addBidListingPic', formData);
      return data;
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const { data } = await axios.post('/item/addBidListing', { product, productDescr, tag });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
};

const submitPriceListing = async (product, productDescr, price, tag, imgLink, imageFile) => {
  if (imgLink && imgLink !== '') {
    const formData = new FormData();
    formData.append('product', product);
    formData.append('productDescr', productDescr);
    formData.append('price', price);
    formData.append('tag', tag);
    formData.append('imageFile', imageFile);
    try {
      const { data } = await axios.post('/item/addRegListingPic', formData);
      return data;
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const { data } = await axios.post('/item/addRegListing', {
        product, productDescr, price, tag,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  submitBidListing,
  submitPriceListing,
};
