function sTGet (){
    const courses = localStorage.getItem('courses')
    if(courses){
        return JSON.parse(courses)
    }
    return [];
}

function StSetAndCheck (newId, hr){
    const sTData =sTGet();
    const alreadyExists = sTData.find(id => id.newId === newId)
    if(alreadyExists){
        return 'error';
    }
    else{
        const newSTData = JSON.stringify([...sTData, {newId, hr}])
        localStorage.setItem('courses', newSTData)
        return 'ok';
    }
}

export {StSetAndCheck, sTGet}
