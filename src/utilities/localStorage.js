function sTGet (){
    const courses = localStorage.getItem('courses')
    if(courses){
        return JSON.parse(courses)
    }
    return [];
}

function StSetAndCheck (newId){
    const sTData =sTGet();
    const alreadyExists = sTData.find(id => id === newId)
    if(alreadyExists){
        return 'error';
    }
    else{
        const newSTData = JSON.stringify([...sTData, newId])
        localStorage.setItem('courses', newSTData)
        return 'ok';
    }
}

export {StSetAndCheck, sTGet}
