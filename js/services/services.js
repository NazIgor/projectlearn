async function postData(url,data){
    const res= await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
}
async function getResource(url){
    const res=await fetch(url);
    if (!res.ok){
        throw new Error(`${url}, status:${res.status}`);
    }
    return await res.json();
}
function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}
export {postData};
export {getResource};
export {getZero};