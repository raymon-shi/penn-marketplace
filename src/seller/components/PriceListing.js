import React, { useState, Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import upload from '../assets/upload.svg';

const PriceListing = () => {
  const [product, setProduct] = useState('');
  const [productDescr, setProductDescr] = useState('');
  const [img, setImg] = useState('');
  const [tag, setTag] = useState('');

  const options = [
    { value: 'Textbooks', label: 'Textbooks' },
    { value: 'Services', label: 'Services' },
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Housing & Furniture', label: 'Housing & Furniture' },
  ];

  return (
    <Card className="shadow rounded mx-auto p-4" border="light" style={{ width: '50%' }}>
      <Form onSubmit={(e) => {
        e.preventDefault();
        e.target.reset();
        setImg('');
      }}
      >
        <Form.Group className="mb-3">
          <Form.Label className="required">Product</Form.Label>
          <Form.Control type="text" name="product" placeholder="Enter product name" onChange={(e) => setProduct(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3 img-upload">
          <Form.Label>Image</Form.Label>
          { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
          <label className="upload-btn" htmlFor="file-input">
            Upload Image
            <img className="ms-2" src={upload} alt="uploaded file" />
          </label>
          <Form.Control type="file" id="file-input" onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))} hidden />
          {img !== '' && (<img className="mt-2" src={img} alt="product-pic" height="200" width="200" />)}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="required">Product Description</Form.Label>
          <Form.Control as="textarea" name="product-descr" rows={3} placeholder="Provide some details about your product" onChange={(e) => setProductDescr(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Select value={tag} onChange={(e) => setTag(e.target.value)}>
            <option className="d-none" value="">Select a tag</option>
            <option value="Textbooks">Textbooks</option>
            <option value="Services">Services</option>
            <option value="Clothes">Clothes</option>
            <option value="Housing &#38; Furniture">Housing &#38; Furniture</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" disabled={product === '' || productDescr === ''}>Submit</Button>
      </Form>
    </Card>
  );
};

export default PriceListing;
