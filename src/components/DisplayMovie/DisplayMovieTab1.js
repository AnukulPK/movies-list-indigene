import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Pagination from '../Pagination/Pagination';
import 'bootswatch/dist/slate/bootstrap.min.css';


const DisplayMovieTab1 = ()=>{
    const [movieName, setMovieName] = useState('');
    const [movieYear, setMovieYear] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [modalData, setModalData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(4);
    
    const DEFAULT_PLACEHOLDER_IMAGE =
  "https://images.pexels.com/photos/37728/pexels-photo-37728.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
 

    async function fetchInfo(e){
        e.preventDefault();        
        try{
            const response = await axios.get(`http://www.omdbapi.com/?s=${movieName}&y=${movieYear}&apikey=de84d4f5`);
            let movies = response.data.Search;
            setMovieData(movies);            
            console.log(movieData);    
        }catch(error){
            console.error(error);        
        }        
    }

    async function modalHandler(imdbID){
        setShowModal(true);
        console.log(imdbID);
        try{
            const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=de84d4f5`);
            console.log(response.data);
            setModalData(response.data);              
        }catch(error){
            console.error(error);        
        }    

    }

    const handleMovieName = (e)=>{
        setMovieName(e.target.value);
    }

    const handleMovieYear = (e)=>{
        setMovieYear(e.target.value);
    }

    const style={
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#A9A9A9'
          },
          content: {
            fontSize:"110%",
            color:"#000000",
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#b2beb5',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
    }

    const indexOfLastMovie = currentPage*moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovie = movieData.slice(indexOfFirstMovie,indexOfLastMovie);

    const paginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
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
        <Pagination style={{backgroundColor:"white"}} moviesPerPage={moviesPerPage} totalMovies={movieData.length} paginate={paginate}/>    

        {
            movieData ? currentMovie.map(movie=>{
                return(
                        <div className="container" key={movie.imdbID}>
                        <div className="row" style={{float:"Left"}} >
                            <div className="col-md-3">                            
                                <div className="card m-3" style={{width: "25rem", height:"20rem"}} >                            
                                    <div className="card-body" >
                                    <h2 className="card-title" >{movie.Title}</h2>
                                    <p className="card-text">Type: {movie.Type}</p>
                                    <p className="card-text">Year: {movie.Year}</p>
                                    <p className="card-text">IMDB: {movie.imdbID}</p>                                    
                                        <button className="btn btn-primary" onClick={()=>modalHandler(movie.imdbID)}>More Info</button>
                                        <Modal ariaHideApp={false} isOpen={showModal} style={style}>
                                            <h2>{modalData.Title}</h2>
                                            <img src={modalData.Poster==='N/A' ? DEFAULT_PLACEHOLDER_IMAGE:modalData.Poster} style={{float:"right", width:"20%", height:"40%"}} alt="Poster"/>
                                            <p>Actors: {modalData.Actors}</p>
                                            <p>Awards: {modalData.Awards}</p>
                                            <p>Director: {modalData.Director}</p>
                                            <p>Director: {modalData.Genre}</p>
                                            <p>Plot: {modalData.Plot}</p>
                                            <p>Released on: {modalData.Released}</p>
                                            <p>Writer: {modalData.Writer}</p>
                                            <p>Country: {modalData.Country}</p>
                                            <p>Language: {modalData.Language}</p>
                                            <p>Runtime: {modalData.Runtime}</p>
                                            <p>Rating :{modalData.imdbRating}</p>
                                            {modalData.imdbRating>7 ? <span className="badge badge-secondary btn-success " style={{width:"100%", height:"5%", fontSize:"100%"}}>IT'S A HIT!</span>:<span className="badge badge-secondary btn-danger" style={{width:"100%", height:"5%",fontSize:"100%"}}>OOPS. ITS A FLOP!</span>}
                                            <br></br>
                                            <br></br>
                                            <button className="btn btn-danger" onClick={()=>setShowModal(false)}>Close</button>
                                        </Modal>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                       </div>
                      

                    
                )
            }):<div className="alert alert-warning" role="alert">No Data Found. Try Again!</div>
        } 
        
        </>

    )
}



export default DisplayMovieTab1;