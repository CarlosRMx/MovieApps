let maxPage;
let page=1;
let infiniteScroll;

searchFormBtn.addEventListener('click',()=>{
    const input=searchFormInput.value;
    location.hash='#search='+ input;

    setTimeout(() => {
        searchForm.reset();
    },3000);
});

trendingBtn.addEventListener('click',()=>{
    location.hash='#trends';
});
arrowBtn.addEventListener('click',()=>{
    history.back();
})

//Navegacion haciendo uso de hash 

window.addEventListener('DOMContentLoaded',navigator,false);
//evento al cambiar el hash de la url
window.addEventListener('hashchange',navigator,false);


window.addEventListener('scroll',infiniteScroll,false);


function navigator(){
    console.log({location});

    if(infiniteScroll){
        window.removeEventListener('scroll',infiniteScroll,{passive:false});
        infiniteScroll=undefined;
    }

    if(location.hash.startsWith('#trends')){
        trendsPage();

    }else if(location.hash.startsWith('#search=')){
        searchPage();

    }else if(location.hash.startsWith('#movie=')){
        movieDetailPage();

    }else if(location.hash.startsWith('#category=')){
        categoriesPage();

    }else{
        homePage();
    }
    
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;

    if(infiniteScroll){
        window.addEventListener('scroll',infiniteScroll,{passive:false});
    }
}

function trendsPage(){

    console.log('Trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();

    infiniteScroll=getMoreTrendingMovies;
}
function searchPage(){
    console.log('Serch');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    likedSection.classList.add('inactive');

    const [_,query]=location.hash.split('=');
    getMoviesBySearch(query);

    infiniteScroll=getMoreMoviesBySearch(query);
}
function movieDetailPage(){
    console.log('Movie');

  
    
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    likedSection.classList.add('inactive');

    //obteniendo el id de la pelicula a la que se le da click
    //['movie','7845222'];
    const [_,movieId]=location.hash.split('=');


    getMovieById(movieId);
    getSimilarMovies(movieId);
}
function categoriesPage(){
    console.log('Category');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    likedSection.classList.add('inactive');

   // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = decodeURIComponent(categoryName);
    
    getMoviesByCategory(categoryId);
    infiniteScroll=getMoreMoviesByCategory(categoryId);
}
function homePage(){
    console.log('Home');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    likedSection.classList.remove('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

/*Referencias para infine scrolling 
document.documentElement.clientHeight indica el alto de la venta 
document.documentElement.clientHeight indica la cantida de scroll que se ha hecho
document.documentElement.scrollHeight indica la cantidad de scroll que se puede hacer
*/