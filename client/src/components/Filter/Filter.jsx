import { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateFilterProducts } from '../../features/filterProducts/filterProductsSlice';
import { useSelector } from 'react-redux';

const sortTypes = [
  { sortTypeId: 1, value: 'price-asc', name: 'sort', description: 'Price (Lowest first)' },
  { sortTypeId: 2, value: 'price-dsc', name: 'sort', description: 'Price (Highest first)' },
  { sortTypeId: 3, value: 'name-dsc', name: 'sort', description: 'Name (Descending)' },
  { sortTypeId: 4, value: 'name-asc', name: 'sort', description: 'Name (Ascending)' },
];

const marks = [
  {
    value: 0,
    label: '$0',
  },
  {
    value: 100,
    label: '$100',
  },
];

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#c29e5b',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#c29e5b',
    },
  },
});

const Filter = () => {
  const [selectedCategories, setSelectedCategories] = useState([{ id: 0, name: 'All' }]);
  const [sliderValue, setSliderValue] = useState([0, 100]);
  const [selectedSort, setSelectedSort] = useState({});

  const products = useSelector(state => state.products.value);
  const filteredProducts = useSelector(state => state.filterProducts.value);
  const categories = [{ id: 0, name: 'All' }, ...useSelector(state => state.categories.value)];

  const dispatch = useDispatch();

  const handleSliderChange = event => {
    setSliderValue(event.target.value);
  };

  const updateSelectedCategories = e => {
    if (e.target.name === 'All' && e.target.checked) {
      setSelectedCategories([{ id: e.target.value, name: e.target.name }]);

      categories.forEach(element => {
        if (element.id !== 0) {
          const checkbox = document.getElementById(element.id);
          checkbox.checked = false;
        }
      });
    } else {
      document.getElementById(0).checked = false;
      if (selectedCategories[0].id === '0') setSelectedCategories([{ id: e.target.value, name: e.target.name }]);
      else {
        const tempCategories = [];
        categories.forEach((element, index) => {
          if (document.getElementById(index).checked === true) {
            tempCategories.push({
              id: document.getElementById(index).id,
              name: document.getElementById(index).name,
            });
          }
        });
        setSelectedCategories(tempCategories);
      }
    }
  };

  const updateSelectedSort = e => {
    setSelectedSort({ sortId: e.target.id, sortName: e.target.name, sortValue: e.target.value });
  };

  const categoriesJSX = categories.map(category => (
    <div key={category.id} className="filter__categories-input-cb">
      <input
        className="crsr"
        onChange={updateSelectedCategories}
        type="checkbox"
        id={category.id}
        value={parseInt(category.id)}
        name={category.name}
        defaultChecked={category.id === 0 ? true : false}
      />
      <label htmlFor={category.id}>{category.name}</label>
    </div>
  ));

  const sortJSX = sortTypes.map(sortType => (
    <FormControlLabel
      key={sortType.sortTypeId}
      value={sortType.value}
      control={<Radio />}
      label={sortType.description}
      onClick={updateSelectedSort}
      sx={{ '& .MuiTypography-root': { fontSize: '14px', fontFamily: 'Kanit' } }}
    />
  ));

  const filterProducts = () => {
    const newFilterData = [];

    const filter = selectedCategories.map(category => category.id);
    const sort = selectedSort.sortValue === undefined ? 'name-asc' : selectedSort.sortValue;

    // console.log(products);
    // console.log(filter);

    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < filter.length; j++) {
        if (
          (products[i].categoryId === parseInt(filter[j]) || filter[j] === '0') &&
          products[i].price >= sliderValue[0] &&
          products[i].price <= sliderValue[1]
        ) {
          newFilterData.push(products[i]);
          break;
        }
      }
    }

    switch (sort) {
      case 'price-asc':
        newFilterData.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });
        break;
      case 'price-dsc':
        newFilterData.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });
        break;
      case 'name-asc':
        newFilterData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-dsc':
        newFilterData.sort((a, b) => {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
        break;

      default:
        newFilterData.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    dispatch(updateFilterProducts([...newFilterData]));
  };

  return (
    <aside className="filter">
      <div className="filter__categories">
        <h2 className="filter__categories-title">Product Categories</h2>
        <div className="filter__categories-input">{categoriesJSX}</div>
      </div>
      <div className="filter__price">
        <h2 className="filter__price-title">Filter By Price</h2>
        <div className="filter__price-slider">
          <Box sx={{ width: '150px' }}>
            <Typography
              className="filter__price-slider-title"
              gutterBottom
              sx={{ fontSize: 14, fontFamily: 'kanit' }}>
              Price range: {`$${sliderValue[0]} - $${sliderValue[1]}`}
            </Typography>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={sliderValue}
              onChange={handleSliderChange}
              valueLabelDisplay="off"
              marks={marks}
              sx={{
                '& .MuiSlider-markLabel': {
                  fontSize: '14px',
                  color: '#36454f',
                },
                '& .MuiSlider-valueLabelLabel': {
                  fontSize: '14px',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#c29e5b',
                  borderColor: '#c29e5b',
                },
                '& .MuiSlider-thumb': {
                  backgroundColor: '#c29e5b',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#c29e5b',
                },
              }}
            />
          </Box>
        </div>
      </div>
      <div className="filter__sort">
        <h2 className="filter__sort-title">Sort By</h2>
        <ThemeProvider theme={theme}>
          <RadioGroup defaultValue="name-asc" name="radio-buttons-group">
            {sortJSX}
          </RadioGroup>
        </ThemeProvider>
      </div>
      <ThemeProvider theme={theme}>
        <Button variant="outlined" className="filter__btn" onClick={filterProducts}>
          Filter ({filteredProducts.length})
        </Button>
      </ThemeProvider>
    </aside>
  );
};

export default Filter;
