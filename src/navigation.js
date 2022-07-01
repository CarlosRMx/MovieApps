searchFormBtn.addEventListener('click',()=>{
    location.hash='#search=';
});

trendingBtn.addEventListener('click',()=>{
    location.hash='#trends';
});
arrowBtn.addEventListener('click',()=>{
    location.hash='#home';
})

//Navegacion haciendo uso de hash 

window.addEventListener('DOMContentLoaded',navigator,false);
//evento al cambiar el hash de la url
window.addEventListener('hashchange',navigator,false);


function navigator(){
    console.log({location});

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
}
function categoriesPage(){
    console.log('Category');

    limpiarSearchByCategory();
    
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

   // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;
    
    getMoviesByCategory(categoryId);
}
function homePage(){
    console.log('Home');
    limpiarMovieTrendsHTML();
    limpiarCateogriasHTML();

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

    getTrendingMoviesPreview();
    getCategoriesPreview();
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