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
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
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
  };

  const compressImage = async event => {
    const imageFile = event.target.files[0];
    setImageFileName(imageFile.name);
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    // console.log(`Image name: ${imageFileName}`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
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

    console.log(URL.createObjectURL(imageFile));

    axios
      .post('https://localhost:7062/api/Products', formData)
      .then(response => {
        console.log(response);
        CallToast(`The product "${productTitle}" added successfully to the Database`, 'success');
        setDefaultValues();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="admin__container">
      <Typography variant="h2" gutterBottom className="page-title">
        Add New Product
      </Typography>

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
          required
          value={productPrice}
          onChange={e => setProductPrice(e.target.value)}
        />
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
          inputProps={{
            style: { fontSize: '14px' },
            min: 0,
            max: 100,
          }}
          InputProps={{
            startAdornment: <Percent />,
          }}
          label="Discount"
          variant="outlined"
          type="number"
          required
          value={productDiscount}
          onChange={e => setProductDiscount(e.target.value)}
        />

        <FormControl required>
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
      <ToastContainer />
    </div>
  );
};

export default Admin;
