import React, { useState, Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import uploadIcon from '../assets/upload.svg';
import imgIcon from '../assets/image.svg';

const BidListing = ({ onSubmit }) => {
  const [product, setProduct] = useState('');
  const [productDescr, setProductDescr] = useState('');
  const [img, setImg] = useState('');
  const [tag, setTag] = useState('');
  const [invalidImgAlert, setInvalidImgAlert] = useState(false);

  const options = [
    { value: 'Textbooks', label: 'Textbooks' },
    { value: 'Services', label: 'Services' },
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Housing & Furniture', label: 'Housing & Furniture' },
  ];

  return (
    <div className="reg-listing pb-5">
      <h1 className="title">Bid Listing</h1>
      <Card className="shadow rounded mx-auto p-5" border="light" style={{ width: '50%' }}>
        <Form onSubmit={(e) => {
          e.preventDefault();
          console.log(`product: ${product}, descr: ${productDescr}, tag: ${tag}`);
          setProduct('');
          setImg('');
          setProductDescr('');
          setTag('');
          onSubmit();
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
                  setImg(URL.createObjectURL(image));
                } else {
                  setInvalidImgAlert(true);
                }
              }}
              hidden
            />
            {img !== '' && (<img className="mt-2" src={img} alt="product-pic" width="100%" />)}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="required">Product Description</Form.Label>
            <Form.Control as="textarea" value={productDescr} name="product-descr" rows={3} placeholder="Provide some details about your product" onChange={(e) => setProductDescr(e.target.value)} />
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

          <Button className="w-50 mt-3" type="submit" disabled={product === '' || productDescr === ''}>Submit</Button>
        </Form>
      </Card>
    </div>
  );
};

export default BidListing;
