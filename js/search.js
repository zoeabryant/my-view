
google.load('search', '1');

var imageSearch;

function searchComplete() {

	    // Check that we got results
	    if (imageSearch.results && imageSearch.results.length > 0) {

	      // Grab our content div, clear it.
	      var contentDiv = document.getElementById('content');
	      contentDiv.innerHTML = '';

	      // Loop through our results, printing them to the page.
	      var results = imageSearch.results;
	      for (var i = 0; i < results.length; i++) {
	        // For each result write to screen
	        var result = results[i];
	        var imgContainer = document.createElement('div');
	        var link = document.createElement('a');
	        var newImg = document.createElement('img');

	        // apply image
	        newImg.src = result.tbUrl; // result.url - large version

	        // apply link to original content
	        link.href = result.originalContextUrl;
	        link.title = result.titleNoFormatting;
	        link.target = "_blank";

	        imgContainer.classList.add('result'); // add classes for easy stylin'
	        imgContainer.appendChild(link);
	        link.appendChild(newImg);

	        // Put our results in the content
	        contentDiv.appendChild(imgContainer);
	    }
	}
}

function OnLoad() {

	    // Create an Image Search instance.
	    imageSearch = new google.search.ImageSearch();

	    // Set searchComplete as the callback function when a search is 
	    // complete.  The imageSearch object will have results in it.
	    imageSearch.setSearchCompleteCallback(this, searchComplete, null);

	    // no longer loaded automatically
	    // imageSearch.execute("Canary Wharf");
	    
	    // Include the required Google branding
	    google.search.Search.getBranding('branding');
	}
	google.setOnLoadCallback(OnLoad);
