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

    createMovies(movies,trendingMoviesPreviewList,true);
}
async function getTrendingMovies(){
    const {data:{results}}= await api('trending/movie/day');
    const movies=results;

    createMovies(movies,genericSection,{lazyLoad:true,clean:true});

    // const btnLoadMore=document.createElement('button');
    // btnLoadMore.addEventListener('click',getMoreTrendingMovies);
    // btnLoadMore.textContent='Cargar mas';
    // genericSection.appendChild(btnLoadMore);
}

async function getMoreTrendingMovies(){

    const {scrollTop,scrollHeight,clientHeight}=document.documentElement;

    const scrollIsBottom = (scrollTop+clientHeight) >= (scrollHeight-15)

    if(scrollIsBottom){
        page++;
        const {data:{results}}= await api('trending/movie/day',{
            params:{
                'page':page,
            }
        });
        
        const movies=results;
    
        createMovies(movies,genericSection,{lazyLoad:true,clean:false});
    }
    // page++;
    // const {data:{results}}= await api('trending/movie/day',{
    //     params:{
    //         'page':page,
    //     }
    // });
    
    // const movies=results;

    // createMovies(movies,genericSection,{lazyLoad:true,clean:false});

    // const btnLoadMore=document.createElement('button');
    // btnLoadMore.addEventListener('click',getMoreTrendingMovies);
    // btnLoadMore.textContent='Cargar mas';
    // genericSection.appendChild(btnLoadMore);

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
    createMovies(movies,genericSection,true);
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

async function getMovieById(id){
    const {data} = await api(`movie/${id}`);
    //console.log(data);
    const {original_title,overview,vote_average,poster_path,genres}=data;
    //console.log(overview,original_title,genres);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + poster_path;
    headerSection.style.background = `
        linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = original_title;
    movieDetailDescription.textContent = overview;
    movieDetailScore.textContent = vote_average;

    createCategories(genres, movieDetailCategoriesList);
}

async function getSimilarMovies(id){
    const {data:{results}} = await api(`movie/${id}/recommendations`);
    const movies=results;
    //console.log(data);

    createMovies(movies,relatedMoviesContainer);
}


//helpers 

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const url = entry.target.getAttribute('data-img')
        entry.target.setAttribute('src', url);
      }
    });
});

function createMovies(
    movies,
    container, 
    {
        lazyLoad=false,
        clean=true
    }={},
){

    limpiarMovieTrendsHTML();
    limipiarSimilarMoviesList();

    if(clean){
        limpiarSearchByCategory();
    }
    
    movies.forEach(movie => {

        const {tittle,poster_path,id}=movie;
        //creando los elementos dinamicamente
        const movieContainer=document.createElement('div');
        movieContainer.classList.add('movie-container');

        const imgMovieContainer=document.createElement('img');
        imgMovieContainer.classList.add('movie-img');
        imgMovieContainer.setAttribute('alt',tittle);
        imgMovieContainer.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300' + poster_path,
        );

        imgMovieContainer.addEventListener('error',()=>{
            imgMovieContainer.setAttribute(
                'src',
                'https://static.platzi.com/static/images/error/img404.png'
            )
        })
        
        if(lazyLoad){
            lazyLoader.observe(imgMovieContainer);
        }
        

        movieContainer.addEventListener('click',()=>{
            location.hash = '#movie=' + id;
        })

        movieContainer.appendChild(imgMovieContainer);
        container.appendChild(movieContainer);
    });

}

function createCategories(categories,container){

    limpiarCategoriesMovieDetail();
    limpiarCateogriasHTML();

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

function limpiarCateogriasHTML(){
    while(categoriesPreviewList.firstChild){
        categoriesPreviewList.removeChild(categoriesPreviewList.firstChild);
    }
}

function limpiarMovieTrendsHTML(){
    while(trendingMoviesPreviewList.firstChild){
        trendingMoviesPreviewList.removeChild(trendingMoviesPreviewList.firstChild);
    }
}
function limpiarSearchByCategory(){
    while(genericSection.firstChild){
        genericSection.removeChild(genericSection.firstChild);
    }
}

function limpiarCategoriesMovieDetail(){
    while(movieDetailCategoriesList.firstChild){
        movieDetailCategoriesList.removeChild(movieDetailCategoriesList.firstChild);
    }
}

function limipiarSimilarMoviesList(){
    while(relatedMoviesContainer.firstChild){
        relatedMoviesContainer.removeChild(relatedMoviesContainer.firstChild);
    }
}