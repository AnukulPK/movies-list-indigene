import React from 'react';

const Home = ()=>{
    return(
        <>
        <div class="card m-20" style={{width: "48rem", marginLeft:"25%", marginTop:"10%", marginRight:"30%"}}>
            <div class="card-body pl-4 m-3">
                <h5 class="card-title">This is a Movie Information Application</h5>
                <h6 class="card-subtitle mb-2 text-muted">Instructions</h6>
                <p class="card-text">
                <ul>
                    <li>Click the Tab1 to search for your movie and learn more about it!</li>
                    <li>Each Card is provided with a button to learn more about the movie</li>
                    <li>Pagination has also been implemneted for a seamless User Interface</li>
                </ul>
                <ul>
                    <li>Click the Tab2 to search for your movie and look at some amazing posters along with gaining some much needed information!</li>
                </ul>
                </p>                
            </div>
        </div>        
        </>
    )
}

export default Home;