import {configureStore,createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { API_KEy, TMBD_BASE_URL } from "../utils/constant";
import axios from "axios";

const initialState ={
    movies:[],
    genreLoaded: false ,
    genres : []
};
export const getGenres=createAsyncThunk("netflix/genres",async()=>{
const {data:{genres}}=await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEy}`);

return genres;

});
const createArrayFromRawData=(array,moviesArray,genres)=>{
    //console.log(array)
array.forEach((movie) => {
    const movieGenre=[];
    movie.genre_ids.forEach((genre)=>{
        const name=genres.find(({id})=>id ===genre);
        if(name) movieGenre.push(name.name);
    });
    if(movie.backdrop_path)
    {
        moviesArray.push({
            id:movie.id,
            name:movie?.original_name ? movie.original_name : movie.orignal_title,
            image:movie.backdrop_path,
            genres : movieGenre.slice(0,3),
        })
    }
});
};


const getRawData=async(api,genres,paging)=>{
    const moviesArray=[];
    for(let i=1;moviesArray.length<60 && i<10 ;i++)
    {
       const {data:{results}}= await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
       createArrayFromRawData(results,moviesArray,genres);
       return moviesArray;

    }

};
export const fetchMovies=createAsyncThunk("netflix/trending",async({type},thunkApi)=>{
const {netflix:{genres}}=thunkApi.getState();
return getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEy}`,
genres,
true);
//console.log(data)
});
const NetflixSlice = createSlice({
    name : "Netflix",
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(getGenres.fulfilled,(state,action)=>{
          state.genres=action.payload;
          state.genreLoaded=true;
        });
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
            
          });
        
    },
});
export const store= configureStore({
    reducer : {
        netflix: NetflixSlice.reducer,
    },
});