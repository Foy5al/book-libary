// get search value form input box
const searchBtn = () => {
    spinnerToggle('block');
    const getSearchtxt = document.getElementById('search-box')
    const searchTxt = getSearchtxt.value;
    getDataFromUrl(searchTxt);
    //clear search value and book result
    getSearchtxt.value = '';
    document.getElementById('resultFound').textContent = '';
}

//get search data from server
const getDataFromUrl = async searchTxt => {
    const erroMsgContainer = document.getElementById('resultcontaine')
    erroMsgContainer.textContent = ' ';

    //fetch url for geting data
    const url = `https://openlibrary.org/search.json?q=${searchTxt}`
    const response = '';
    // use try cathc for error handeling
    try {
        const resp = await fetch(url)
        const response = resp;
        const getdata = await response.json()
        if (getdata.numFound !== 0) {
        }

        else {
            erroMsgContainer.innerHTML = `
            <span class="fs-1 fw-bold">Sorry we didn't found any book in this name '${searchTxt}' 😔😔</span>
            `
            spinnerToggle('none')
        }
        displayData(getdata);
        return;
    }

    catch (error) {
        erroMsgContainer.innerHTML = '<span class="fs-1 fw-bold">😐😐 404 link not found or any other error occurred pls check the console for error</span>'
        console.log(error);
    }

}

//show data in display
const displayData = searchResult => {
    const numberOfDataFound = searchResult.num_found
    const resultContainer = document.getElementById('resultcontaine')

    //search book counter
    document.getElementById('resultFound').innerText = `Total Book Found: ${numberOfDataFound}`

    //use fetched data into the site 
    const booksList = searchResult.docs
    booksList.forEach(book => {
        //filter data using common function
        const bookCover = getImg(book.cover_i)
        const authorsName = getdata(book.author_name);
        const firstPublishedYear = filterData(book.first_publish_year);
        const publisherName = getdata(book.publisher);
        const numberOfPages = filterData(book.number_of_pages_median);

        //search result display
        const resultDiv = document.createElement('div')
        resultDiv.classList = 'card shadow p-3 mb-5 bg-body rounded'
        resultDiv.style.width = '18rem'
        resultDiv.innerHTML = `
        <img src="${bookCover}"class="card-img-top" height="400px">
            <div class="card-body">
                <h6 class="card-text"><strong>Book Title:</strong> ${book.title}</h6>
        <p><strong>Author:</strong> ${authorsName} || <strong>Publish Year:</strong> ${firstPublishedYear}|| <strong>Publisher Name:</strong> ${publisherName} || <strong>Number Of Pages: </strong>${numberOfPages}</p>
            </div>
        `
        resultContainer.appendChild(resultDiv);
        //loading spineer off
        spinnerToggle('none')
    });

}

//data filter function starts here
// used for image erro control
const getImg = imgid => {
    const url = `https://covers.openlibrary.org/b/id/${imgid}-M.jpg`;
    if (imgid !== undefined) {
        return url;
    }
    else {
        return 'resources/imgnotfound.png'
    }
}

//used for filter undefined data  
const filterData = getDataforFilter => {
    //let authorsNamelist = '';
    if (getDataforFilter !== undefined) {

        return getDataforFilter;
    }
    else {
        return 'Unknown';
    }
}

//this is a common function used for get data from array
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

// spinner function
const spinnerToggle = (displayStatus) => {
    document.getElementById('spinner-container').style.display = displayStatus;
}