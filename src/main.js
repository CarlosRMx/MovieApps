async function getTrendingMoviesPreview(){
    const answer= await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+API_KEY);
    const data = await answer.json();

    // console.log(answer);
    // console.log(data);

    //Variable que contiene el array de las peliculas
    const {results}=data;

    results.forEach(movie => {
        //principal container
        const trendingMoviesContainerPreview=document.querySelector('#trendingPreview .trendingPreview-movieList');
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
        trendingMoviesContainerPreview.appendChild(movieContainer);
    });
}

async function getCategoriesPreview(){
    const answer= await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key='+API_KEY);
    const data = await answer.json();

    // console.log(answer);
    // console.log(data);

    const {genres}=data;

    genres.forEach(category =>{
        //principal container
        const categoriesContainerPrewiew=document.querySelector('#categoriesPreview .categoriesPreview-list');
        const {id,name}=category;

        //creando los elementos de cada categoria
        const categoryContainer=document.createElement('div');
        categoryContainer.classList.add('category-container');
        
        const tittleCategory = document.createElement('h3');
        tittleCategory.classList.add('category-title');
        tittleCategory.setAttribute('id','id'+ id);
        tittleCategory.textContent=name;

        categoryContainer.appendChild(tittleCategory);
        categoriesContainerPrewiew.appendChild(categoryContainer);
    });
}
getTrendingMoviesPreview();
getCategoriesPreview();