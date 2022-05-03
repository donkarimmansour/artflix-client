import { Host } from "../common/apiEndPoints"

const calculateRating = (rates , multi = true) => {
    if(!rates || rates.length == 0){
        return ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star"]
    }

    let stars

   if(multi){
        const sum = rates.reduce((sum, current) => sum + current.rate, 0)
        stars = (sum / rates.length)
   }else{
        stars = rates
   }
  
  if (stars <= 3)
      return ["fas fa-star", "fas fa-star", "fas fa-star", "far fa-star", "far fa-star"]
  else if (stars > 3 && stars <= 3.5)
      return ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star-half-alt", "far fa-star"]
  else if (stars > 3.5 && stars <= 4)
      return ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "far fa-star"]
  else if (stars > 4 && stars <= 4.5)
      return ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star-half-alt"]
  else if (stars > 4.5)
      return ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star"]

}

const ImageLink = (img) => {
    return  `${Host.BACKEND}${Host.PREFIX}/file/get-single-image/${img}/view`
}

const countDown = (end) => {
    var today = new Date().getTime();
    var d = new Date(end).getTime() - today;
    var days = Math.floor(d / (1000 * 60 * 60 * 24));
    var hr = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.floor((d % (1000 * 60)) / 1000);

    if(!end){
        return {days : 0, hr  : 0 ,  min  : 0 , sec  : 0 }
    }
    return {days, hr  ,  min  , sec } 
}


const handleSize = (price, index , e) => {
    const sizes = e.target.parentElement.parentElement.querySelectorAll("li") ;

    sizes.forEach((em, i) => {
        em.className = ""
        if (i == index) {
            em.className = "active"

            em.parentElement.parentElement
                .parentElement.parentElement.
                querySelector(".ec-price .new-price").innerText =`$${price}`


        }
    })

}

const handleColor = (index , e) => {
    const colors = e.target.parentElement.querySelectorAll("li") ;

    colors.forEach((em, i) => {
        em.className = ""
        if (i == index) {
            em.className = "active"
        }
    })
}

const extractDesk = (desk , length) => {
    if(desk.length > length){
         return desk.substr(0 , length) + "..."
    }else {
        return desk
    }
}


export {calculateRating , ImageLink , countDown , handleColor , handleSize , extractDesk}  