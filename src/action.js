const baseUrl = 'http://localhost:8080';

const url = `${baseUrl}/register`

export const getMemberList = async () => {
    await fetch(url,{
        method:'GET'
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        return res;
    })
    .catch(err=>{
        console.error(err);
        throw err;
    })
}

export const putMember = async (data) => {
    await fetch(url,{
        method:'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res=>{
        console.log("PUT data",res);
        return res;
    })
    .catch(err=>{
        console.error(err);
        throw err;
    })
}