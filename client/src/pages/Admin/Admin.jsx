import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

import { AttachMoney, CloudUploadOutlined, Percent, PhotoCamera } from '@mui/icons-material';
import CallToast from '../../components/Toaster/CallToaster';
import { ToastContainer } from 'react-toastify';

const weightUnits = ['kg', 'g', 'l', 'ml'];

const Admin = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [categoryValue, setCategoryValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [productStock, setProductStock] = useState(0);
  const [productQuantityPerUnit, setProductQuantityPerUnit] = useState(1);
  const [productDiscontinued, setProductDiscontinued] = useState(false);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productWeight, setProductWeight] = useState('');
  const [productWeightMsr, setProductWeightMsr] = useState('kg');
  const [productExtra, setProductExtra] = useState('');
  const [productCurrentPrice, setProductCurrentPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [productId, setProductId] = useState(0);
  const [image, setImage] = useState(null);

  const setDefaultValues = () => {
    setProductTitle('');
    setProductName('');
    setProductDescription('');
    setProductPrice(0);
    setCategoryValue('');
    setProductStock(0);
    setProductQuantityPerUnit(1);
    setProductDiscontinued(false);
    setProductDiscount(0);
    setProductWeight('');
    setProductWeightMsr('kg');
    setImageFile(null);
    setImageFileName('');
    setImage(null);
    setProductExtra('');
    setProductCurrentPrice(0);
    setProductId(0);
  };

  const compressImage = async event => {
    const imageFile = event.target.files[0];
    setImageFileName(imageFile.name);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      setImageFile(compressedFile);

      // Create a temporary URL for the compressed image
      setImage(URL.createObjectURL(compressedFile));

      // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get('https://localhost:7062/api/Categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddNewProduct = e => {
    e.preventDefault();

    //Check all the required fields have valid data

    const formData = new FormData();
    formData.append('title', productTitle);
    formData.append('name', productName);
    formData.append('categoryId', categoryValue);
    formData.append('description', productDescription);
    formData.append('weight', parseFloat(productWeight));
    formData.append('weightMsr', productWeightMsr);
    formData.append('price', productPrice);
    formData.append('imageData', imageFile);
    formData.append('imageName', imageFileName);
    formData.append('stock', productStock);
    formData.append('quantity', productQuantityPerUnit);
    formData.append('discount', productDiscount);
    formData.append('discountinued', productDiscontinued);
    formData.append('extra', productExtra);
    formData.append('currentPrice', productCurrentPrice);

    console.log(URL.createObjectURL(imageFile));

    axios
      .post('https://localhost:7062/api/Products', formData)
      .then(response => {
        setProductId(response.data.id);
        CallToast(`The product "${productTitle}" added successfully to the Database`, 'success');
        setDefaultValues();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const updateProductPrice = e => {
    let priceValue = 0;
    let discountValue = 0;

    if (e.target.name === 'price') {
      priceValue = e.target.value;
      discountValue = productDiscount;

      if (discountValue === 0) {
        setProductCurrentPrice(priceValue);
        setProductPrice(priceValue);
      } else {
        setProductCurrentPrice(priceValue - priceValue * (discountValue / 100));
        setProductPrice(priceValue);
      }
    } else {
      priceValue = productPrice;
      discountValue = e.target.value;

      if (priceValue === 0) {
        setProductCurrentPrice(priceValue);
        setProductDiscount(priceValue);
      } else {
        setProductCurrentPrice(priceValue - priceValue * (discountValue / 100));
        setProductDiscount(discountValue);
      }
    }
  };

  return (
    <div className="admin">
      <Typography variant="h2" gutterBottom className="page-title">
        Add New Product
      </Typography>

      <div className="admin__container">
        <aside className="admin__search">
          <Typography variant="h4" gutterBottom className="admin__search-header">
            Search Product
          </Typography>
        </aside>
        <form className="grid__container">
          <TextField
            className="grid__container-title"
            inputProps={{
              style: { fontSize: '14px', width: '16rem' },
            }}
            label="Product Title"
            variant="outlined"
            required
            value={productTitle}
            onChange={e => setProductTitle(e.target.value)}
          />
          <TextField
            inputProps={{ style: { fontSize: '14px', width: '16rem' } }}
            label="Product Name"
            variant="outlined"
            required
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
          <FormControl required>
            <InputLabel htmlFor="category-select">Product Category</InputLabel>
            <Select
              id="category-select"
              label="Product Category"
              value={categoryValue}
              onChange={e => setCategoryValue(e.target.value)}>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            inputProps={{
              style: { fontSize: '14px' },
              min: 0,
              step: 1,
            }}
            label="Units in Stock"
            variant="outlined"
            type="number"
            required
            value={productStock}
            onChange={e => setProductStock(parseInt(e.target.value))}
          />
          <TextField
            inputProps={{
              style: { fontSize: '14px' },
              min: 1,
              step: 1,
            }}
            label="Quantity Per Unit"
            variant="outlined"
            type="number"
            required
            value={productQuantityPerUnit}
            onChange={e => setProductQuantityPerUnit(parseInt(e.target.value))}
          />
          <TextField
            InputProps={{
              startAdornment: <AttachMoney />,
            }}
            inputProps={{
              style: { fontSize: '14px' },
              min: 0,
            }}
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            required
            value={productPrice}
            onChange={updateProductPrice}
          />

          <TextField
            inputProps={{
              style: { fontSize: '14px' },
              min: 0,
              max: 100,
            }}
            InputProps={{
              endAdornment: <Percent />,
            }}
            label="Discount"
            variant="outlined"
            type="number"
            name="discount"
            required
            value={productDiscount}
            onChange={updateProductPrice}
          />

          <TextField
            InputProps={{
              startAdornment: <AttachMoney />,
            }}
            inputProps={{
              style: { fontSize: '14px' },
              min: 0,
            }}
            disabled
            label="Current Price"
            variant="outlined"
            type="number"
            required
            value={productCurrentPrice}
          />
          <TextField
            className="grid__container-descr"
            inputProps={{
              style: { fontSize: '14px' },
            }}
            label="Product Description"
            variant="outlined"
            required
            multiline
            rows={15}
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
          />
          <TextField
            inputProps={{
              style: { fontSize: '14px' },
              step: 0.01,
            }}
            label="Weight"
            variant="outlined"
            type="number"
            required
            value={productWeight}
            onChange={e => setProductWeight(e.target.value)}
          />

          <FormControl required>
            <InputLabel htmlFor="weightMsr-select">Product Weight Units</InputLabel>
            <Select
              id="category-select"
              label="Product Weight Units"
              value={productWeightMsr}
              onChange={e => setProductWeightMsr(e.target.value)}>
              {weightUnits.map((unit, index) => (
                <MenuItem key={index} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="grid__container-image">
            <Box
              className="grid__container-image-box"
              component="img"
              sx={{
                maxHeight: '17rem',
                maxWidth: '30rem',
              }}
              alt="The house from the offer."
              src={image || '/images/placeholder.png'}
            />

            <label htmlFor="image-upload" className="image_btn">
              <Button
                component="span"
                pvariant="outlined"
                startIcon={<PhotoCamera />}
                style={{ backgroundColor: '#61a48a', color: 'white' }}>
                Upload Image
              </Button>
            </label>
            <Box sx={{ display: 'none' }}>
              <input type="file" id="image-upload" accept="image/*" onChange={compressImage} />
            </Box>
          </div>

          <TextField
            className="grid__container-title"
            inputProps={{
              style: { fontSize: '14px', width: '16rem' },
            }}
            label="Product Extra"
            variant="outlined"
            required
            value={productExtra}
            onChange={e => setProductExtra(e.target.value)}
          />

          <TextField
            inputProps={{
              style: { fontSize: '14px' },
              min: 1,
              step: 1,
            }}
            label="Product ID"
            variant="outlined"
            type="number"
            disabled
            value={productId}
          />

          <FormControl required error>
            <InputLabel htmlFor="Discontinued-select">Discontinued</InputLabel>
            <Select
              defaultValue={false}
              id="Discontinued-select"
              label="Discontinued"
              value={productDiscontinued}
              onChange={e => setProductDiscontinued(e.target.value)}>
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={handleAddNewProduct}
            className="submit-btn"
            type="submit"
            component="span"
            pvariant="outlined"
            startIcon={<CloudUploadOutlined />}
            style={{ backgroundColor: '#c29e5b', color: 'white' }}>
            Upload Product
          </Button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Admin;
