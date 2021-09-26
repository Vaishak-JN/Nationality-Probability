// let result=document.querySelector(".result");
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

// result 
let result=document.createElement("div")
result.setAttribute("class","result")
container.append(result)
result.innerHTML=""
// var form=document.querySelector("form")

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let name=event.target.name.value;
    // or
    // let name=document.getElementById("name").value
    console.log(name);
    let nums=[0,1,2,3,4,5,6,7,8,9]
    console.log(name.length)
    displayData(name)
    event.target.reset();

})

var displayData= async (name)=>{
    let fetchdata=await fetch(`https://api.nationalize.io/?name=${name}`)
    let data=await fetchdata.json();
    try{
        console.log(data)
        console.log(data.country)
        result.innerHTML=""
        heading.innerHTML=""
        heading.innerHTML=`Results for <span>"${name}"</span>`
        if(data.country.length>0){
            
            for(let i=0;i<2;i++){
                
                let box=document.createElement("div");
                box.setAttribute("class","box")
                let id=document.createElement("p");
                id.setAttribute("class","id")
                id.innerHTML=`Country ID: <span>${data.country[i].country_id}</span>`
                let probability=document.createElement("p");
                probability.setAttribute("class","prob")
                probability.innerHTML=`Probability: <span>${data.country[i].probability*100}%</span>`
                box.append(id)
                box.append(probability)
                result.append(box);
                document
            }
        }else if(data.country.length==0){
            let box=document.createElement("div");
            box.setAttribute("class","error")
            let msg=document.createElement("p");
            msg.innerText="Sorry no data found";
            box.append(msg);
            result.appendChild(box);
        }
    }catch(error){
        console.error(error)
    }
}