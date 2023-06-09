import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import {
  AttachMoney,
  CloudUploadOutlined,
  HighlightOffOutlined,
  Percent,
  PhotoCamera,
  SearchOutlined,
} from '@mui/icons-material';
import CallToast from '../../components/Toaster/CallToaster';
import { ToastContainer } from 'react-toastify';
import { updateProducts } from '../../reducers/productsSlice';

const weightUnits = ['kg', 'g', 'l', 'ml'];

const Admin = () => {
  const products = useSelector(state => state.products.value);
  const dispatch = useDispatch();
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
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [clearValue, setClearValue] = useState(false);
  const [title, setTitle] = useState('Add New Product');

  //! GET CATEGORIES
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

  //! PRODUCT DEFAULT VALUES
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
    setTitle('Add New Product');
    setClearValue(prev => !prev);
  };

  //! COMPRESS IMAGE
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

  //! LOAD PRODUCTS
  const loadProducts = () => {
    axios
      .get('https://localhost:7062/api/Products')
      .then(response => {
        const newData = response.data.map(product => {
          product.imageData = `https://localhost:7062${product.imageData}`;
          return product;
        });
        dispatch(updateProducts([...newData]));
        // setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  //! ADD/UPDATE PRODUCT TO DB
  const handleAddNewProduct = e => {
    e.preventDefault();

    //todo Check all the required fields have valid data

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
    formData.append('discontinued', productDiscontinued);
    formData.append('extra', productExtra);
    formData.append('currentPrice', productCurrentPrice);

    if (productId > 0) formData.append('id', productId);

    //! Create new product
    if (productId === 0) {
      axios
        .post('https://localhost:7062/api/Products', formData)
        .then(response => {
          setProductId(response.data.id);
          CallToast(`The product "${productTitle}" added successfully to the Database`, 'success');
          setDefaultValues();
          loadProducts();
        })
        .catch(error => {
          console.error(error);
        });
      //! Update product
    } else {
      axios
        .patch('https://localhost:7062/api/Products', formData)
        .then(response => {
          CallToast(`The product "${productTitle}" updated successfully in the Database`, 'success');
          // Clear the autocomplete field
          setClearValue(prev => !prev);
          loadProducts();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  //! UPDATE CURRENT PRICE
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

  //! SEARCH PRODUCT
  const handleSearchProduct = () => {
    setProductTitle(product.title);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setCategoryValue(product.categoryId);
    setProductStock(product.stock);
    setProductQuantityPerUnit(product.quantity);
    setProductDiscontinued(product.discontinued);
    setProductDiscount(product.discount);
    setProductWeight(product.weight);
    setProductWeightMsr(product.weightMsr);
    setProductExtra(product.extra);
    setProductCurrentPrice(product.currentPrice);
    setProductId(product.id);
    setImage(product.imageData);

    setTitle('Update Product');
  };

  //! AUTOCOMPLETE RESULTS
  const handleInputChange = event => {
    const userInput = event.target.value;
    let matchingProducts = '';

    matchingProducts = products.filter(product => {
      const productName = product.title.toLowerCase();
      const lowerCaseUserInput = userInput.toLowerCase();
      return product.id.toString().includes(userInput) || productName.includes(lowerCaseUserInput);
    });

    setMatchingProducts(matchingProducts);
  };

  return (
    <div className="admin">
      <Typography variant="h2" gutterBottom className="page-title">
        {title}
      </Typography>

      <div className="admin__container">
        {/* //! SEARCH SECTION */}

        <aside className="admin__search">
          <Typography variant="h4" gutterBottom className="admin__search-header">
            Search Product
          </Typography>

          <Autocomplete
            key={clearValue}
            options={matchingProducts}
            getOptionLabel={option => option.id.toString() + ' - ' + option.title}
            renderInput={params => (
              <TextField {...params} label="Product" variant="outlined" fullWidth onChange={handleInputChange} />
            )}
            onChange={(e, value) => {
              if (value !== null) setProduct(value);
              else setProduct({});
            }}
          />
          <Button
            onClick={handleSearchProduct}
            className="admin__search-btn"
            component="span"
            variant="contained"
            // color="neutral"
            size="large"
            startIcon={<SearchOutlined />}
            style={{ backgroundColor: '#c29e5b', color: 'white' }}>
            Search Product
          </Button>
        </aside>

        {/* //! MAIN SECTION */}

        <form className="grid__container">
          {/* //! TITLE */}
          <TextField
            className="grid__container-title"
            inputProps={{
              style: { fontSize: '14px', width: '16rem' },
            }}
            label="Product Title"
            variant="outlined"
            required
            value={productTitle}
            onChange={e => {
              setProductTitle(e.target.value);
            }}
          />

          {/* //! NAME */}
          <TextField
            inputProps={{ style: { fontSize: '14px', width: '16rem' } }}
            label="Product Name"
            variant="outlined"
            required
            value={productName}
            onChange={e => {
              setProductName(e.target.value);
            }}
          />

          {/* //! CATEGORY */}
          <FormControl required>
            <InputLabel htmlFor="category-select">Product Category</InputLabel>
            <Select
              id="category-select"
              label="Product Category"
              value={categoryValue}
              onChange={e => {
                setCategoryValue(e.target.value);
              }}>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* //! STOCK */}
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
            onChange={e => {
              setProductStock(parseInt(e.target.value));
            }}
          />

          {/* //! QUANTITY */}
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
            onChange={e => {
              setProductQuantityPerUnit(parseInt(e.target.value));
            }}
          />

          {/* //! PRICE */}
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

          {/* //! DISCOUNT */}
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

          {/* //! CURRENT PRICE */}
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

          {/* //! DESCRIPTION */}
          <TextField
            className="grid__container-description"
            inputProps={{
              style: { fontSize: '14px' },
            }}
            label="Product Description"
            variant="outlined"
            required
            multiline
            rows={15}
            value={productDescription}
            onChange={e => {
              setProductDescription(e.target.value);
            }}
          />

          {/* //! WEIGHT */}
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
            onChange={e => {
              setProductWeight(e.target.value);
            }}
          />

          {/* //! WEIGHT MSR */}
          <FormControl required>
            <InputLabel htmlFor="weightMsr-select">Product Weight Units</InputLabel>
            <Select
              id="category-select"
              label="Product Weight Units"
              value={productWeightMsr}
              onChange={e => {
                setProductWeightMsr(e.target.value);
              }}>
              {weightUnits.map((unit, index) => (
                <MenuItem key={index} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* //! IMAGE */}
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
                startIcon={<PhotoCamera />}
                variant="contained"
                // color="neutral"
                size="large"
                // style={{ backgroundColor: "#61a48a", color: "white" }}
              >
                Upload Image
              </Button>
            </label>
            <Box sx={{ display: 'none' }}>
              <input type="file" id="image-upload" accept="image/*" onChange={compressImage} />
            </Box>
          </div>

          {/* //! EXTRA */}
          <TextField
            className="grid__container-title"
            inputProps={{
              style: { fontSize: '14px', width: '16rem' },
            }}
            label="Product Extra"
            variant="outlined"
            required
            value={productExtra}
            onChange={e => {
              setProductExtra(e.target.value);
            }}
          />

          {/* //! ID */}
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

          {/* //! DEISCONTINUED */}
          <FormControl required error>
            <InputLabel htmlFor="Discontinued-select">Discontinued</InputLabel>
            <Select
              defaultValue={false}
              id="Discontinued-select"
              label="Discontinued"
              value={productDiscontinued}
              onChange={e => {
                setProductDiscontinued(e.target.value);
              }}>
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={handleAddNewProduct}
            className="submit-btn"
            type="submit"
            component="span"
            variant="contained"
            color="success"
            size="large"
            startIcon={<CloudUploadOutlined />}>
            Upload Product
          </Button>
          <Button
            onClick={setDefaultValues}
            className="clear-btn"
            type="button"
            component="span"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<HighlightOffOutlined />}>
            Clear Product
          </Button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Admin;
