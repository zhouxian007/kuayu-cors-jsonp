const request = new XMLHttpRequest()
request.open('GET','http://qq.com:8888/friends.json')
request.onreadystatechange=()=>{
    if(request.readyState===4 && request.status===200){
        console.log(request.response)
    }
}
request.send();


//封装jsonp
function jsonp(url){
    return new Promise((resolve,reject)=>{
    const random = 'zhouxianJsonPName'+Math.random()
    window[random] = (data)=>{
      
        resolve(data)
    }    
        const script = document.createElement('script')
        script.src=`${url}?callback=${random}`
        script.onload=()=>{
            script.remove()
        }
        script.onerror=()=>{
            reject()
        }
        document.body.appendChild(script)
    })
}
//使用jsonp
jsonp('http://qq.com:8888/friends.js')
.then((data)=>{
console.log(data)

})