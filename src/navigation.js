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
}
function searchPage(){
    console.log('Serch');
}
function movieDetailPage(){
    console.log('Movie');
}
function categoriesPage(){
    console.log('Category');
}
function homePage(){
    console.log('Home');
    getTrendingMoviesPreview();
    getCategoriesPreview();
}