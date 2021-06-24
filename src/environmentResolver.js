export const loadEnvironment = async () => {
    let url = `/env.json`;
    return await fetch(url,{
        method:'GET'
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        return res;
    })
}