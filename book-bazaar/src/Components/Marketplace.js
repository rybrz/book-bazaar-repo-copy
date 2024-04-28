import React, { useState, useEffect } from 'react';
import Popup from './BuyPopup';
import Tile from './Tile';
// import Filter from './Filter';
import './Marketplace.css';
import { getFirestore, collection, getDocs, doc, collectionGroup } from 'firebase/firestore';

const Marketplace = ({ searchQuery, applyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'Books');
        const snapshot = await getDocs(colRef);
        const fetchedEntries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        fetchedEntries.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
        );

        // Simulate a delay before setting loading to false
        setTimeout(() => {
          setEntries(fetchedEntries);
          setLoading(false);
        }, 1200); // Adjust the delay as needed
      } catch (error) {
        console.error('Error fetching entries: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  var filteredBooks = entries.filter((entry) => {
    const query = (searchQuery || '').toString().toLowerCase();

    // Filter by search query
    const matchesSearchQuery =
      (entry.isbn && entry.isbn.toString().toLowerCase().includes(query)) ||
      entry.title.toLowerCase().includes(query) ||
      entry.author.toLowerCase().includes(query);

    // Filter by applyFilter conditions
    // console.log(applyFilter);
    // console.log(applyFilter);
    const matchesFilter =
      !applyFilter ||
      ((applyFilter.sort === 'latest' || applyFilter.sort === 'oldest') &&
        entry.datePosted) ||
      applyFilter.sort === 'title-az' ||
      applyFilter.sort === 'title-za' ||
      applyFilter.sort === 'price-lh' ||
      applyFilter.sort === 'price-hl' ||
      !applyFilter.condition ||
      entry.condition === applyFilter.condition;

    return matchesSearchQuery && matchesFilter;
  });

  // Handles the condition filter event.
  switch(applyFilter.condition){
    
    case 'new':
      filteredBooks = filteredBooks.filter((entry) => (
        entry.condition === 'new'
      ));
      break;

    case 'used':
      filteredBooks = filteredBooks.filter((entry) => (
        entry.condition === 'used'
      ));
      break;

    case 'poor':
      filteredBooks = filteredBooks.filter((entry) => (
        entry.condition === 'poor'
      ));
      break;

    default:
      break;
  };

  // Sort filteredBooks by datePosted from oldest to newest if applyFilter.sort === 'oldest'
  if (applyFilter && applyFilter.sort === 'oldest') {
    filteredBooks.sort(
      (a, b) =>
        new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
    );
  }

  // Sort filteredBooks by datePosted from newest to oldest if applyFilter.sort === 'latest'
  if (applyFilter && applyFilter.sort === 'latest') {
    filteredBooks.sort(
      (a, b) =>
        new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
    );
  }

  if (applyFilter && applyFilter.sort === 'title-az') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Sort filteredBooks by title Z-A if applyFilter.sort === 'title-za'
  if (applyFilter && applyFilter.sort === 'title-za') {
    filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Sort filteredBooks by price lowest to highest if applyFilter.sort === 'price-lh'
  if (applyFilter && applyFilter.sort === 'price-lh') {
    filteredBooks.sort((a, b) => a.price - b.price);
  }

  // Sort filteredBooks by price highest to lowest if applyFilter.sort === 'price-hl'
  if (applyFilter && applyFilter.sort === 'price-hl') {
    filteredBooks.sort((a, b) => b.price - a.price);
  }

  const handleOpenPopup = (entry) => {
    setIsOpen(true);
    setSelectedEntry(entry);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="marketplace">
      {loading ? (
        <div className="loading-animation"></div>
      ) : filteredBooks.length > 0 ? (
        filteredBooks.map((entry) => (
          <Tile key={entry.id} entry={entry} onClick={handleOpenPopup} />
        ))
      ) : (
        <div className="no-results">No results found...</div>
      )}
      {isOpen && <Popup entry={selectedEntry} onClose={handleClosePopup} />}
    </div>
  );
};

export default Marketplace;
