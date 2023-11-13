import './App.css';

import React, { useState, useEffect} from 'react';

function App() {
    const [data, setData] = useState([]);

    //useEffect(() => {}, []);
    useEffect(() => {
        // Fetch data from the server
        fetch('http://localhost:5000/api/data')
            .then(response => {
                // Return the parsed JSON
                return response.json();
            })
            .then(result => {
                setData(result);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    return (
        <div>
            <h2>All Movies</h2>
            <div style={{ display: 'flex' }}>
                {data.length > 0 ? (
                    data.map((movie) => (
                        <div key={movie._id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                            <p>{movie.title}</p>
                            <img src={movie.imageURL} width="350px" height="500px" alt="back to the future poster"/>
                            <button>Rate this Movie!</button>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );


}
export default App;
