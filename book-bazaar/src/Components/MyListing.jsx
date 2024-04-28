import './MyListing.css';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MyListing = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        let fetchedEntries = [];
        if (currentUser) {
          const q = query(
            collection(db, 'Books'),
            where('email', '==', currentUser.email)
          );
          const snapshot = await getDocs(q);
          snapshot.forEach((doc) => {
            fetchedEntries.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        }
        setFetchedData(fetchedEntries);
        setLoading(false);
        console.log('Success');
      } catch (error) {
        console.error('Error fetching entries: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'Books', id));
      setFetchedData(fetchedData.filter((entry) => entry.id !== id));
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  return (
    <div className="listing-container">
      <div className="listing-header">My Listings</div>
      <div className="listing-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          fetchedData.map((entry) => (
            <div key={entry.id} className="inbox-item">
              <div className="listing-image-container">
                <img src={entry.imgurl} alt="" />
              </div>
              <div className="listing-text-container">{entry.title}</div>
              <div className="listing-price-container">${entry.price}</div>
              <div className="listing-button-container">
                <button className="listing-button button-blue">
                  <FontAwesomeIcon icon={faEdit} style={{ color: 'white' }} />
                </button>
                <button
                  className="listing-button button-red"
                  onClick={() => handleDelete(entry.id)}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: 'white' }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyListing;
