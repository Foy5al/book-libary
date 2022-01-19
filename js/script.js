// get search value form input box
const searchBtn = () => {
    //spinnerToggle('block');
    const getSearchtxt = document.getElementById('search-box')
    const searchTxt = getSearchtxt.value;
    getDataFromUrl(searchTxt);
    getSearchtxt.value = '';
}

//get search data from server
const getDataFromUrl = async searchTxt => {
    const erroMsgContainer = document.getElementById('resultcontaine')
    erroMsgContainer.textContent = ' ';

    const url = `https://openlibrary.org/search.json?q=${searchTxt}`
    console.log(url)
    const response = '';
    try {
        const resp = await fetch(url)
        // console.log(getdata);
        const response = resp;
        console.log(response, 'this is response')
        const getdata = await response.json()
        if (getdata.numFound !== 0) {
            console.log('kisu ase')

            //return getdata;
        }

        else {
            console.log('kisu nai')
            erroMsgContainer.innerHTML = `
            <span class="fs-1 fw-bold"> 😔😔Sorry we didn't have any book in this name '${searchTxt}' </span>
            `
        }
        displayData(getdata);
        return;
    }

    catch (error) {
        console.log('dhorchi error', error)
        erroMsgContainer.innerHTML = '<span class="fs-1 fw-bold">😐😐 404 link not found </span>'
    }

}

//show data in display
const displayData = searchResult => {
    console.log(searchResult.num_found)
    console.log(searchResult)
    const numberOfDataFound = searchResult.num_found
    const resultContainer = document.getElementById('resultcontaine')
    document.getElementById('resultFound').innerText = `Total Data Found: ${numberOfDataFound}`
    const booksList = searchResult.docs

    booksList.forEach(book => {
        const bookCover = getImg(book.cover_i)
        const authorsName = getdata(book.author_name);
        //const firstPublished = getdata(book.first_publish_year)

        console.log(book);
        const resultDiv = document.createElement('div')
        resultDiv.classList = 'card'
        resultDiv.style.width = '18rem'
        resultDiv.innerHTML = `
        <img src="${bookCover}"class="card-img-top" height="400px">
            <div class="card-body">
                <p class="card-text">Book Title: ${book.title}</p>
                <p>Author:${authorsName} || Publish: ${book.first_publish_year}</p>
            </div>
     
        `
        resultContainer.appendChild(resultDiv);
    });
    //

}

//get image
const getImg = imgid => {
    const url = `https://covers.openlibrary.org/b/id/${imgid}-M.jpg`;
    if (imgid !== undefined) {
        return url;
    }
    else {
        return 'resources/imgnotfound.png'
    }
    //return image;
}

//get authors name 
const getAuthorsName = authors => {
    let authorsNamelist = '';
    if (authors !== undefined) {
        authors.forEach(author => {
            const data = author + ' ,' + authorsNamelist;
            authorsNamelist = data;
        });

        return authorsNamelist;
    }
    else {
        return authorsNamelist = 'Unknown';
    }
}

//common function for get data from array
const getdata = datalist => {
    let arrayData = '';
    if (datalist !== undefined) {
        datalist.forEach(dataOfArray => {
            const data = dataOfArray + ' ,' + arrayData;
            arrayData = dataOfArray;
        });

        return arrayData;
    }
    else {
        return arrayData = 'Unknown';
    }
}

/* 
//show result counter 

// spinner function
    const spinnerToggle = (displayStatus) => {
    document.getElementById('spinner-container').style.display = displayStatus;
} */
/* <div class="card" style="width: 18rem;">
    <img src=`https://covers.openlibrary.org/b/id/${}-M.jpg` class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
</div> */