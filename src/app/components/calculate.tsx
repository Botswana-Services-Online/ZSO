import { IonIcon } from "@ionic/react"
import { star } from "ionicons/icons"


export const ReviewCalc = (reviews:{rating:number,message:string}[])=>{
    if(reviews){
    const oneRating = []
    const twoRating = []
    const threeRating = []
    const fourRating = []
    const fiveRating = []
    reviews.forEach((review) => {
        if (review.rating == 1) {
            oneRating.push(review)
        } else if (review.rating == 2) {
            twoRating.push(review)
        } else if (review.rating == 3) {
            threeRating.push(review)
        } else if (review.rating == 4) {
            fourRating.push(review)
        } else if (review.rating == 5) {
            fiveRating.push(review)
        }
    })
    const one = oneRating.length
    const two = twoRating.length*2
    const three = threeRating.length*3
    const four = fourRating.length*4
    const five = fiveRating.length*5
    const total = one + two + three + four + five
    const rating:number = Math.round(total / reviews.length)
    // rating===typeof number?rating:"No Rating"
    return <p className="d-flex align-items-center ">{rating}&nbsp;<IonIcon size="small" color="warning" icon={star}/></p>
    }else{
    return <p>No Rating</p>
    }
}
