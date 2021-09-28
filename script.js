// container
let container=document.createElement("div");
container.setAttribute("id","container")
document.body.appendChild(container)
// h1
let h1=document.createElement("h1");
h1.innerText="Check Probable Nationality"
container.append(h1);

// formDiv
let formDiv=document.createElement("div");
container.setAttribute("class","formDiv")
container.appendChild(formDiv)

// form
let form=document.createElement("form");
form.setAttribute("class","form")
formDiv.append(form)

// label
let label=document.createElement("label");
label.setAttribute("for","name");
label.innerText="Name"
form.append(label)

// input
let inp=document.createElement("input");
inp.setAttribute("type","text");
inp.setAttribute("id","name")
inp.setAttribute("required","")
inp.setAttribute("placeholder","Example: Luke")
form.append(inp)


// button

let btn=document.createElement("button")
btn.setAttribute("class","btn");
btn.innerText="Check Probability"
form.append(btn)

let heading=document.createElement("h2");
container.appendChild(heading)

// for filterlabel
let filterlabel=document.createElement("label");
filterlabel.setAttribute("class","filterlabel");
filterlabel.innerHTML=`Filter to nearest probability: <span>${0}</span>`;
filterlabel.setAttribute("style","display:none");
// for filter range
let filterbar=document.createElement("input");
filterbar.setAttribute("class","filterbar");
filterbar.setAttribute("type","range");
filterbar.setAttribute("min","0");
filterbar.setAttribute("max","1");
filterbar.setAttribute("step","0.01");
filterbar.setAttribute("value","0");
filterbar.setAttribute("style","display:none");
container.appendChild(filterlabel)
container.appendChild(filterbar)

// result div - to display the result
let result=document.createElement("div")
result.setAttribute("class","result")
container.append(result)
result.innerHTML=""


form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let name=event.target.name.value;
    // or
    // let name=document.getElementById("name").value
    console.log(name);
    console.log(name.length)
    // call function
    displayData(name)
    event.target.reset();

})
// function
var displayData= async (name)=>{
    let fetchdata=await fetch(`https://api.nationalize.io/?name=${name}`)
    let data=await fetchdata.json();
    try{
        console.log(data)
        console.log(data.country)
        heading.innerHTML=`Top results for : <span>${name}</span>`
        filterlabel.setAttribute("style","display:block");
        filterbar.setAttribute("style","display:block");
        // to display data
        if(data.country.length>0){
            result.innerHTML=""
            filterbar.value=0;
            filterlabel.innerHTML=`Slide to filter to nearest probability: <span>${0}</span>`;
            // to siplay top two results
            for(let i=0;i<2;i++){
                
                let box=document.createElement("div");
                box.setAttribute("class","box")
                let id=document.createElement("p");
                id.setAttribute("class","id")
                id.innerHTML=`Country ID: <span>${data.country[i].country_id}</span>`
                let probability=document.createElement("p");
                probability.setAttribute("class","prob")
                probability.innerHTML=`Probability: <span>${data.country[i].probability}</span>`
                box.append(id)
                box.append(probability)
                result.append(box);
            }
            
        }else if(data.country.length==0){
            result.innerHTML=""
            filterbar.style.display="none"
            filterlabel.style.display="none"
            let box=document.createElement("div");
            box.setAttribute("class","error")
            let msg=document.createElement("p");
            msg.innerText="Sorry no data found";
            box.append(msg);
            result.appendChild(box);
        }
        // for filtering
        filterbar.onchange=()=>{
            console.log("change in filter")
            console.log(filterbar.value)
            console.log(data)
            let filtervalue= filterbar.value;
            console.log(filtervalue)
            filterlabel.innerHTML=`Slide to filter to nearest probability: <span>${filtervalue}</span>`;
            let current=1;
            let nearest;
            if(filtervalue>0){
                data.country.forEach(ele => {
                    let diff=Math.abs(+ele.probability-filtervalue)
                    if(diff<current){
                        current=diff;
                        nearest=ele
                    }
                });
                console.log(nearest)
                console.log(current)
                result.innerHTML=""
                let box=document.createElement("div");
                box.setAttribute("class","box")
                let id=document.createElement("p");
                id.setAttribute("class","id")
                id.innerHTML=`Country ID: <span>${nearest.country_id}</span>`
                let probability=document.createElement("p");
                probability.setAttribute("class","prob")
                probability.innerHTML=`Probability: <span>${nearest.probability}</span>`
                box.append(id)
                box.append(probability)
                result.append(box);
            }else if (filtervalue==0){
                result.innerHTML=""
                filterbar.value=0;
                filterlabel.innerHTML=`Slide to filter to nearest probability: <span>${0}</span>`;

                for(let i=0;i<2;i++){
                    
                    let box=document.createElement("div");
                    box.setAttribute("class","box")
                    let id=document.createElement("p");
                    id.setAttribute("class","id")
                    id.innerHTML=`Country ID: <span>${data.country[i].country_id}</span>`
                    let probability=document.createElement("p");
                    probability.setAttribute("class","prob")
                    probability.innerHTML=`Probability: <span>${data.country[i].probability}</span>`
                    box.append(id)
                    box.append(probability)
                    result.append(box);
                }
            }
        }
    }catch(error){
        console.log(error)
        let msg=document.createElement("p");
        msg.innerText="Sorry something went wrong";
    }
}

// not working
// if(document.querySelector(".filterbar").value>0){
//     console.log("hi")
// }
// filterbar.addEventListener("change",()=>{console.log(filterbar.value)})

// async function filter(name){
//     let fetchdata=await fetch(`https://api.nationalize.io/?name=${name}`)
//     let data=await fetchdata.json();
//     console.log("change in filter")
//     console.log(filterbar.value)
//     console.log(data)
//     let filtervalue= filterbar.value;
//     console.log(filtervalue)
// }
