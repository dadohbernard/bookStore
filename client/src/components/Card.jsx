import React, { useState, useEffect, useRef } from 'react';
import CardCss from '../assets/css/CardCss.css';

function Card() {
    const isLoggedInn = sessionStorage.getItem('isLoggedIn') === 'true'; 
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [customerId, setCustomerId] = useState(null); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const containerRef = useRef(null);

    useEffect(() => {
        loadBooks();
        const storedCustomerId = sessionStorage.getItem('customerId');
        if (storedCustomerId) {
            setCustomerId(parseInt(storedCustomerId)); 
            setIsLoggedIn(true); 
        }
    }, []);

    useEffect(() => {
        loadBooks();
    }, [page]);

    const loadBooks = () => {
        setIsLoading(true);
        fetch(`http://localhost:4000/books?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setBooks(prevBooks => [...prevBooks, ...data]);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setIsLoading(false);
            });
    };

    const handleBuy = (bookId) => {
        if (!isLoggedIn) {
            alert('Please log in first to make a purchase.');
            return;
        }
    
        const orderData = {
            customer_id: customerId,
            bookIds: [bookId]
        };
    
        fetch('http://localhost:4000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Insufficient points to purchase this book.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Order placed:', data);
            if (data.success) {
                alert('Order placed successfully!');
            } else if (data.insufficientPoints) {
                alert('Insufficient points to purchase this book.');
            } else {
                // alert(data.message);
                alert('Order placed successfully!');
            }
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert(error.message); 
        });
    };
    

    return (
        <div ref={containerRef}>
            <div className="card-container">
                {books.map(book => (
                    <div key={book.book_id} className="card-plan">
                        <img className="img" src={book.cover_image} alt="Cover" />
                        <div className="plan-title">{book.title}</div>
                        <div className="plan-card">{`$${book.point}`}</div>
                        <ul className="plan-features">
                            <li className="tags">{`✅ ${book.writer}`}</li>
                        </ul>
                        {isLoggedInn ? ( 
                            <button onClick={() => handleBuy(book.book_id, book.point)}>Buy</button>
                        ) : ( 
                            <p>Please log in first to make a purchase</p>
                        )}
                    </div>
                ))}
            </div>
            {isLoading && <div>Loading...</div>}
        </div>
    );
}

export default Card;
