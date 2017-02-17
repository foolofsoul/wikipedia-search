"use strict";

var colour = {
  colors: [
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "light-teal",
    "teal",
    "purple",
    "violet",
    "pink"
  ],

  oldColor: 0,

  getRandColor: function(){
    var colorChoice = Math.floor(Math.random() * this.colors.length);
    if(this.oldColor === colorChoice) {
      return this.getRandColor();
    } else {
      this.oldColor = colorChoice;
      return this.colors[colorChoice];
    }
  }
}

var btn = document.getElementById("btn"),
    queryResults = document.getElementById("queryResults"),
    input,
    results;

function search(event){
  if( event.keyCode === "13" || event ) {
    event.preventDefault();
    queryResults.innerHTML = "";
    input = document.getElementById("input").value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200){
        results = JSON.parse(xhr.responseText);
        // queryResults.innerHTML = xhr.responseText;
        console.log(results);
        
        if(results.hasOwnProperty('query')){
          
          for (var x in results.query.pages){
            setTimeout(function(){
            var link = document.createElement("a"),
                title = document.createElement("h2"),
                desc = document.createElement("p"),
                selectedColor = colour.getRandColor();

            title.textContent = results.query.pages[x].title;
            link.setAttribute("href", "https://en.wikipedia.org/?curid=" + results.query.pages[x].pageid)
            link.setAttribute("target", "blank_");
            link.className = selectedColor;
            link.appendChild(title);

            if(results.query.pages[x].terms) {
              desc.textContent = results.query.pages[x].terms.description[0];
              link.appendChild(desc);
            }          
            queryResults.appendChild(link);
            }, 100 * x)
          }

        } else {  
          queryResults.innerHTML = "<p>No results found</p>";
        }   
      }
    }  
  }

  xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + input + "&gpslimit=10&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&format=json");
  xhr.setRequestHeader( "Api-User-Agen", "FCC-wiki-api" );
  xhr.send();
}

btn.addEventListener("click" || "keyup", search);

