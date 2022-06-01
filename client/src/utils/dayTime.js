

function dayTime(){

    let x = new Date();

    let y = x.getHours();

    if(y>4&&y<12){
        return "Good morning, "
    }else if (y>=12&&y<18){
        return "Good afternoon, "
    }else {
        return "Good evening, "
    }

}

export default dayTime