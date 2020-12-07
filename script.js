/*usage of Promise function*/
function getRestCountriesData(){

    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET','https://restcountries.eu/rest/v2/all',true);

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status==200)
            {
                resolve(xhr.responseText);
            }
            else if(xhr.readyState == 4 && xhr.status!=200)
            {
                reject('Internal Service Error');
            }
        }
        xhr.send();
    });

}


getRestCountriesData()
.then(function(response){
    /*if promise is resolved then start building html page*/
    buildHTML(JSON.parse(response));
})
.catch(function(err){
    console.log(err);
});


/*building html page*/
function buildHTML(arrObject)
{
    let container = document.querySelector('#wrapper');
    arrObject.forEach(element => {
        let content = document.createElement('div');content.setAttribute('class','content col-sm-6 col-lg-4 d-flex align-items-stretch');
        let card = document.createElement('div');card.setAttribute('class','card m-1');

        let countryField = document.createElement('div');countryField.setAttribute('class','card-header');
        countryField.innerText = element.name;

        let countryImg = document.createElement('img');countryImg.setAttribute('class','card-img-top img-fluid');
        // countryImg.setAttribute('style','height:233.328px');
        countryImg.setAttribute('src',element.flag);

        let cardBody = document.createElement('div');cardBody.setAttribute('class','card-body');
        let cardData = document.createElement('div');cardData.setAttribute('class','card-data mb-1');
        let p = document.createElement('p');p.setAttribute('class','d-inline-block mb-0');
        p.innerText = 'Capital: ';
        let span = document.createElement('span');span.setAttribute('class','badge-lg px-1 rounded badge-success font-weight-bold');
        span.innerText = element.capital;
        cardData.append(p,' ',span);
        cardBody.append(cardData);

        cardData = document.createElement('div');cardData.setAttribute('class','card-data mb-1');
        p = document.createElement('p');p.setAttribute('class','d-inline-block mb-0');
        p.innerText = 'Country Codes: ';
        span = document.createElement('span');span.setAttribute('class','font-weight-bold');
        span.innerText = element.alpha2Code+','+element.alpha3Code;
        cardData.append(p,' ',span);
        cardBody.append(cardData);

        cardData = document.createElement('div');cardData.setAttribute('class','card-data mb-1');
        p = document.createElement('p');p.setAttribute('class','d-inline-block mb-0');
        p.innerText = 'Region: ';
        span = document.createElement('span');span.setAttribute('class','font-weight-bold');
        span.innerText = element.region;
        cardData.append(p,' ',span);
        cardBody.append(cardData);

        cardData = document.createElement('div');cardData.setAttribute('class','card-data mb-1');
        p = document.createElement('p');p.setAttribute('class','d-inline-block mb-0');
        p.innerText = 'LatLong:';
        span = document.createElement('span');span.setAttribute('class','font-weight-bold');
        span.innerText = element.latlng.join(',');
        cardData.append(p,' ',span);
        cardBody.append(cardData);

        card.append(countryField,countryImg,cardBody);
        content.append(card);
        container.append(content);
        console.log(element);
    });
}