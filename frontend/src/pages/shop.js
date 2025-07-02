import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../components/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000000);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Additional for dynamic filter panel
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));

    axios.get('http://localhost:3001/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost:3001/api/brands')
      .then(response => setBrands(response.data))
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.product_category_id === Number(selectedCategory));
    }
    if (selectedBrand) {
      filtered = filtered.filter(product => product.product_brand_id === Number(selectedBrand));
    }
    filtered = filtered.filter(product => product.product_price <= maxPrice);

    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, maxPrice, searchQuery, products]);

  const handleAddToCart = (product_id) => {
    axios.post(
      'http://localhost:3001/api/cart/addtocart',
      { product_id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      toast.success('Product added to cart');
    })
    .catch((err) => {
      toast.error('Error adding to cart');
      console.error('Error adding to cart:', err);
    });
  };

  // --- Make filter panel appear only on category select
  const handleCategoryClick = (category_id) => {
    setSelectedCategory(category_id);
    setShowFilterPanel(!!category_id);
    setSelectedBrand('');
  };

  // --- Show all products button
  const handleShowAllProducts = () => {
    setSelectedCategory('');
    setShowFilterPanel(false);
    setSelectedBrand('');
    setMaxPrice(1000000);
    setSearchQuery('');
  };

  // --- Layout: sidebar and filter panel don't go over nav, use margin-top or padding-top
  // Assume navbar is 80px height
  const NAVBAR_HEIGHT = 80;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav/>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex w-full" style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
        {/* Category Sidebar */}
        <aside
          className="w-60 bg-white text-gray-900 flex flex-col py-10 px-2 gap-2 shadow-lg"
          style={{
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            marginTop: `${NAVBAR_HEIGHT}px`,
            position: "sticky",
            top: `${NAVBAR_HEIGHT}px`,
            zIndex: 10
          }}
        >
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-widest text-blue-700 px-2">CATEGORIES</h2>
          </div>
          <button
            onClick={handleShowAllProducts}
            className="mb-3 mx-2 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
          >
            Show All Products
          </button>
          <nav className="flex-1">
            <ul className="space-y-1">
              {categories.map(category => (
                <li
                  key={category.category_id}
                  className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors
                    ${selectedCategory === String(category.category_id)
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'hover:bg-gray-200'}`}
                  onClick={() => handleCategoryClick(String(category.category_id))}
                >
                  <span className="ml-2">{category.category_name}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Dynamic Filter Panel: show only when a category is selected */}
        {showFilterPanel && (
          <aside
            className="w-80 bg-gray-100 border-l border-gray-300 text-gray-900 py-12 px-8"
            style={{
              minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
              marginTop: `${NAVBAR_HEIGHT}px`,
              position: "sticky",
              top: `${NAVBAR_HEIGHT}px`,
              zIndex: 10
            }}
          >
            <div>
              <div className="flex items-center text-blue-700 mb-2">
                <span className="mr-auto text-sm">0 LKR</span>
                <span className="ml-auto text-sm">{maxPrice} LKR</span>
              </div>
              <input
                type="range"
                min={0}
                max={1000000000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="slider w-full h-2 bg-blue-200 rounded-lg appearance-none accent-blue-700"
                style={{ accentColor: '#2563eb' }}
              />
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-bold text-blue-700 mb-3">AVAILABILITY</h2>
              <div className="flex flex-col gap-1 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-700" disabled />
                  OUT OF STOCK
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-700" disabled />
                  IN STOCK
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-700" disabled />
                  COMING SOON
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-700" disabled />
                  PRE-ORDER
                </label>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-bold text-blue-700 mb-3">BRAND</h2>
              <div className="flex flex-col gap-1 text-sm">
                {brands.map(brand => (
                  <label key={brand.brand_id} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-blue-700"
                      checked={selectedBrand === String(brand.brand_id)}
                      onChange={() => setSelectedBrand(selectedBrand === String(brand.brand_id) ? '' : String(brand.brand_id))}
                    />
                    {brand.brand_name}
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <div className={`flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-20 bg-gray-100 min-h-screen`} style={{marginTop: `${NAVBAR_HEIGHT}px`}}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <div className="relative group overflow-hidden">
                  <img
                    src={`http://localhost:3001${product.product_image}`}
                    alt={product.product_name}
                    className="w-full h-56 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 text-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                    New
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mt-6">{product.product_name}</h3>
                <p className="text-lg text-gray-700 mt-2 font-medium">LKR {product.product_price}</p>
                <div className="mt-4 space-y-4">
                  <button
                    className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 flex items-center justify-center"
                    onClick={() => handleAddToCart(product.product_id)}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.product_id}`}
                    className="w-full mt-2 py-3 text-gray-900 bg-transparent border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}