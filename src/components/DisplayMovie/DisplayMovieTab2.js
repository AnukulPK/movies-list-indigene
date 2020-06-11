import React, {useState} from 'react';
import axios from 'axios';

const DisplayMovieTab2 = ()=>{
    const [movieName, setMovieName] = useState('');
    const [movieYear, setMovieYear] = useState('');
    const [movieData, setMovieData] = useState([]);
    const DEFAULT_PLACEHOLDER_IMAGE =
  "https://images.pexels.com/photos/37728/pexels-photo-37728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

    async function fetchInfo(e){
        e.preventDefault(); 
        if(movieName === '' || movieYear === '')
        {
            alert("Empty input field detected")
        } 
        else{
            try{
                const response = await axios.get(`http://www.omdbapi.com/?s=${movieName}&y=${movieYear}&apikey=de84d4f5`);
                let movies = response.data.Search;
                if(movies === null || response === 'False'){
                    setMovieData([{
                        Poster: "https://images.pexels.com/photos/3952231/pexels-photo-3952231.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        Title: "NO DATA FOUND",
                        Type: "NO DATA FOUND",
                        Year: "NO DATA FOUND",
                        imdbID: "NO DATA FOUND"
                    }])                    
                }
                else{
                    setMovieData(movies);            
                    console.log(movieData); 
                }                   
            }catch(error){
                console.error(error);        
            }
        }      
                
    }

    const handleMovieName = (e)=>{
        setMovieName(e.target.value);
    }

    const handleMovieYear = (e)=>{
        setMovieYear(e.target.value);
    }
    
    return(
        <> 
        <div className="jumbotron">       
        <form className="w-90" onSubmit={fetchInfo}>
        <div className="row">
                <div className="col px-md-3">
                    <div className="form-group" >
                    <h3 className="pb-3 d-flex">Name of Movie</h3>
                    <input type="text" name="movieName" className="form-control" id="exampleInputEmail1" onChange={handleMovieName} />            
                    </div>
                </div>
                <div className="col px-md-3">
                    <div className="form-group">
                    <h3 className="pb-3">Year of Release</h3>
                    <input type="text" name="year" className="form-control"  onChange={handleMovieYear} />
                    </div>
                </div>
        </div>                       
                <button className="btn btn-secondary btn-lg btn-block">Submit</button>
        </form>
        </div>

        {  
           movieData ? movieData.map(movie=>{
                return(
                        <div className="container" key={movie.imdbID}>
                        <div className="row" style={{float:"Left"}} >
                            <div className="col-md-1">                            
                                <div className="card m-3" style={{width: "30rem", height:"40rem"}} > 
                                    
                                    <img className="card-img-top" style={{height:"60%"}} src={movie.Poster==='N/A'? DEFAULT_PLACEHOLDER_IMAGE:movie.Poster} alt="Movie"/>                           
                                    <div className="card-body" >
                                    <h2 className="card-title" >{movie.Title}</h2>
                                    <p className="card-text">Type: {movie.Type}</p>
                                    <p className="card-text">Year: {movie.Year}</p>
                                    <p className="card-text">IMDB: {movie.imdbID}</p>                                   
                                    </div>
                                </div>                            
                            </div>
                        </div>
                        </div>            
                )
            }): <div className="alert alert-warning" role="alert">No Data Found. Try Again!</div>
        }        
        </>

    )
}



export default DisplayMovieTab2;