import React, { useState } from 'react';
import './Sidebar.css';
import Filter from './Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addDoc } from 'firebase/firestore';
import { colRefBooks, auth } from '../firebase';

function Sidebar({ setApplyFilter }) {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="sidebar">
      {/* Left Sidebar */}
      <div className="post-button" onClick={togglePopup}>
        {showPopup && <Popup onClose={togglePopup} />}
        <FontAwesomeIcon icon={faPlus} />
        Upload book
      </div>
      <div className="divider"></div>
      <Filter setApplyFilter={setApplyFilter} />
    </div>
  );
}

function Popup({ onClose }) {
  // const user = auth.currentUser;
  // const email = user.email;
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    summary: '',
    imgurl: '',
    price: '',
    condition: 'nil',
    email: '',
    // email: email,
  });
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to pull boom infro from ISBN
  const fetchData = () => {
    // Fetch data from API using formData.isbn
    // Assuming your API endpoint is `https://api.example.com/data?isbn=value`
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${formData.isbn}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const title = data.items[0]?.volumeInfo?.title || ''; // Replace empty title with space
        const author = data.items[0]?.volumeInfo?.authors?.[0] || ''; // Replace empty author with space
        const summary = data.items[0]?.volumeInfo?.description || ''; // Replace empty summary with space
        const imgurl = data.items[0]?.volumeInfo?.imageLinks?.thumbnail || ''; // Replace empty imgurl with space
        setFormData({
          ...formData,
          title: title,
          author: author,
          summary: summary,
          imgurl: imgurl,
        });
        setFetchSuccess(true); // Mark fetch as successful
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setFetchSuccess(false); // Mark fetch as unsuccessful
        setErrorMessage('Error: ISBN not read');
        setSuccessMessage('');
      });
  };

  const uploadBook = async () => {
    const priceRegex = /^(?!0\d)\d+$/; // Regular expression to match valid price formats
    if (!auth.currentUser) {
      setErrorMessage('User is not logged in.');
      setSuccessMessage('');
    } else if (!fetchSuccess) {
      setErrorMessage('Please enter valid ISBN.');
      setSuccessMessage('');
    } else if (!priceRegex.test(formData.price)) {
      setErrorMessage('Please enter correct price.');
      setSuccessMessage('');
    } else if (formData.condition === 'nil') {
      setErrorMessage('Please select condition.');
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('Success: Book uploaded');

      const user = auth.currentUser;
      if (user) {
        console.log('user logged in');
        const email = user.email;
        console.log('user email:', email);
        formData.email = email;
      } else {
        // do stuff here if user is signed out
        console.log('no user signed in');
      }

      //Date and Time stuff
      const currentDate = new Date().toISOString();

      console.log(JSON.stringify(formData, null, 2)); // Printing JSON data to console

      //Adds books containing fields from formData to FireBase. //Auth: James
      const addedBook = await addDoc(colRefBooks, {
        isbn: formData.isbn,
        title: formData.title,
        author: formData.author,
        summary: formData.summary,
        imgurl: formData.imgurl,
        price: formData.price,
        condition: formData.condition,
        email: formData.email,
        datePosted: currentDate,
        offers: [''],
        // email: 'example@gmail.com',
      });

      // Wait for 2 seconds before closing the popup
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1800);
    }

    // console.log(JSON.stringify(formData, null, 2)); // Printing JSON data to console
  };

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Sell Textbook</h2>
        <div className="form-row">
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
          />{' '}
          <input
            type="text"
            name="title"
            defaultValue={formData.title}
            placeholder="Title"
            readOnly={true}
          />
          <input
            type="text"
            name="author"
            defaultValue={formData.author}
            placeholder="Author"
            readOnly={true}
          />
        </div>
        <textarea
          type="text"
          className="long-input"
          name="summary"
          defaultValue={formData.summary}
          placeholder="Summary"
          readOnly={true}
          style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
        />
        <div className="form-row">
          <input
            type="text"
            name="imgurl"
            defaultValue={formData.imgurl}
            placeholder="Image URL"
            readOnly={true}
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            placeholder="Price"
            onChange={handleChange}
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="nil">Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <br />
        {formData.imgurl && <img src={formData.imgurl} alt="" />} <br />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && (
          <div style={{ color: 'green' }}>{successMessage}</div>
        )}
        <button onClick={fetchData}>Search ISBN</button>
        <button onClick={uploadBook}>Upload Book</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
export default Sidebar;
