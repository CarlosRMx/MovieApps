//Haciendo uso de la libreria axios
const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY
    },

});

async function getTrendingMoviesPreview(){
    const {data:{results}}= await api('trending/movie/day');
    const movies=results;

    createMovies(movies,trendingMoviesPreviewList);
}
async function getTrendingMovies(){
    const {data:{results}}= await api('trending/movie/day');
    const movies=results;

    createMovies(movies,genericSection);
}


async function getCategoriesPreview(){
    const {data:{genres}}= await api('genre/movie/list');
    //console.log(genres);
    const categories=genres;

    // console.log(answer);
    // console.log(data);


    // categories.forEach(category =>{
    //     //principal container
    //     const categoriesPreviewList=document.querySelector('#categoriesPreview .categoriesPreview-list');
    //     const {id,name}=category;

    //     //creando los elementos de cada categoria
    //     const categoryContainer=document.createElement('div');
    //     categoryContainer.classList.add('category-container');
        
    //     const tittleCategory = document.createElement('h3');
    //     tittleCategory.classList.add('category-title');
    //     tittleCategory.setAttribute('id','id'+ id);
    //     tittleCategory.textContent=name;

    //     tittleCategory.addEventListener('click',()=>{
    //         location.hash = `#category=${category.id}-${category.name}`;
    //     })
    //     categoryContainer.appendChild(tittleCategory);
    //     categoriesPreviewList.appendChild(categoryContainer);
    // });
    createCategories(categories,categoriesPreviewList);
}

async function getMoviesByCategory(id){

    const { data:{results} } = await api('discover/movie', {
        params: {
          with_genres: id,
        },
    });

    const movies=results;
    createMovies(movies,genericSection);
}

async function getMoviesBySearch(query){
    const {data:{results}}= await api ('search/movie',{
        params:{
            query,
        }
    });
    const movies=results;
    createMovies(movies,genericSection);
}



//helpers 
function createMovies(movies,container){

    movies.forEach(movie => {
        //principal container
        //const trendingMoviesPreviewList=document.querySelector('#trendingPreview .trendingPreview-movieList');
        const {tittle,poster_path}=movie;

        //creando los elementos dinamicamente
        const movieContainer=document.createElement('div');
        movieContainer.classList.add('movie-container');

        const imgMovieContainer=document.createElement('img');
        imgMovieContainer.classList.add('movie-img');
        imgMovieContainer.setAttribute('alt',tittle);
        imgMovieContainer.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + poster_path,
        )

        movieContainer.appendChild(imgMovieContainer);
        container.appendChild(movieContainer);
    });

}

function createCategories(categories,container){

    categories.forEach(category =>{
        //principal container
        const categoriesPreviewList=document.querySelector('#categoriesPreview .categoriesPreview-list');
        const {id,name}=category;

        //creando los elementos de cada categoria
        const categoryContainer=document.createElement('div');
        categoryContainer.classList.add('category-container');
        
        const tittleCategory = document.createElement('h3');
        tittleCategory.classList.add('category-title');
        tittleCategory.setAttribute('id','id'+ id);
        tittleCategory.textContent=name;

        tittleCategory.addEventListener('click',()=>{
            location.hash = `#category=${category.id}-${category.name}`;
        })
        categoryContainer.appendChild(tittleCategory);
        container.appendChild(categoryContainer);
    });
}