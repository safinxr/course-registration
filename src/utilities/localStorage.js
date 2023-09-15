function sTGet() {
    const courses = localStorage.getItem('courses')
    if (courses) {
        return JSON.parse(courses)
    }
    return [];
}

function StSetAndCheck(newId, hr) {
    const sTData = sTGet();
    const alreadyExists = sTData.find(id => id.newId === newId)
    if (alreadyExists) {
        return 'error';
    }
    else {
        let totalHr = 0;
        for (const data of sTData) {
            totalHr = totalHr + data.hr
        }
        if (totalHr + hr <= 20) {
            const newSTData = JSON.stringify([...sTData, { newId, hr }])
            localStorage.setItem('courses', newSTData)
            return 'ok';
        }
        else{
            return 'error2';
        }

    }
}

function sTRemove (cId){
    const sTData = sTGet();
    const afterRemove = sTData.filter(id => id.newId !== cId)
    const removeDataJson =JSON.stringify(afterRemove)
    localStorage.setItem('courses', removeDataJson)
    return 'ok'

}

export { StSetAndCheck, sTGet, sTRemove }
