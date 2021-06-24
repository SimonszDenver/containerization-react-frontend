const endpoint = `/register`;

export const getMemberList = async (url) => {
    return await fetch(url+endpoint,{
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

export const putMember = async (url,data) => {
    await fetch(url+endpoint,{
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