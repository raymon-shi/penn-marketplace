import React, { useState, useRef } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import uploadIcon from '../assets/upload.svg';
import imgIcon from '../assets/image.svg';

const PriceListing = ({ onSubmit, onBack }) => {
  const [product, setProduct] = useState('');
  const [productDescr, setProductDescr] = useState('');
  const [price, setPrice] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [tag, setTag] = useState('');
  const [invalidImgAlert, setInvalidImgAlert] = useState(false);
  const imageFile = useRef(null);

  return (
    <div className="reg-listing pb-5">
      <h1 className="title">Sale Listing</h1>
      <Card className="shadow rounded mx-auto p-5" border="light" style={{ width: '50%' }}>
        <Form onSubmit={(e) => {
          e.preventDefault();
          if (imgLink && imgLink !== '') {
            const formData = new FormData();
            formData.append('product', product);
            formData.append('productDescr', productDescr);
            formData.append('price', price);
            formData.append('tag', tag);
            formData.append('imageFile', imageFile.current);
            axios.post('/item/addRegListingPic', formData).then(() => {
              setProduct('');
              setImgLink('');
              setProductDescr('');
              setPrice('');
              setTag('');
              onSubmit();
            }).catch((err) => alert('Error in posting! Please try again.'));
          } else {
            axios.post('/item/addRegListing', {
              product, productDescr, price, tag,
            }).then(() => {
              setProduct('');
              setImgLink('');
              setProductDescr('');
              setPrice('');
              setTag('');
              onSubmit();
            }).catch((err) => alert('Error in posting! Please try again.'));
          }
        }}
        >
          <Form.Group className="mb-3">
            <Form.Label className="required">Product</Form.Label>
            <Form.Control type="text" value={product} name="product" placeholder="Enter product name" onChange={(e) => setProduct(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3 img-upload">
            <Form.Label>
              Image
              <img className="ms-1" src={imgIcon} alt="pic icon" />
            </Form.Label>
            <Alert show={invalidImgAlert} variant="danger">
              <p>Invalid file format. Please choose a file ending in .jpg, .jpeg, or .png!</p>
            </Alert>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label className="upload-btn" htmlFor="file-input">
              Upload Image
              <img className="ms-2" src={uploadIcon} alt="uploaded file" />
            </label>
            <Form.Control
              type="file"
              id="file-input"
              onChange={(e) => {
                const image = e.target.files[0];
                if (image.name.match(/\.(jpg|jpeg|PNG)$/)) {
                  setInvalidImgAlert(false);
                  setImgLink(URL.createObjectURL(image));
                  imageFile.current = image;
                } else {
                  setInvalidImgAlert(true);
                }
              }}
              hidden
            />
            {imgLink !== '' && (<img className="mt-2" src={imgLink} alt="product-pic" width="100%" />)}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="required">Product Description</Form.Label>
            <Form.Control as="textarea" value={productDescr} name="product-descr" rows={3} placeholder="Provide some details about your product" onChange={(e) => setProductDescr(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="required">Price</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="any"
              name="product-price"
              value={price}
              placeholder="Set a price"
              onKeyPress={(e) => {
                if (!/[0-9]|\./.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tag</Form.Label>
            <Form.Select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option className="d-none" value="">Select a tag</option>
              <option value="Textbooks">Textbooks</option>
              <option value="Services">Services</option>
              <option value="Clothes">Clothes</option>
              <option value="Housing &#38; Furniture">Housing &#38; Furniture</option>
            </Form.Select>
          </Form.Group>

          <div className="mt-4 back-submit-btns">
            <Button type="submit" disabled={product === '' || productDescr === '' || price === '' || Number(price) <= 0}>Post</Button>
            <Button onClick={onBack}>Back</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PriceListing;
