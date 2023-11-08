const http= require("http")   
const url=require ("url")
const fs=require ("fs")
const server=http.createServer((req,res)=>{   
console.log(req.url)
 const path=url.parse(req.url,true)  
if(path.pathname==="/"){
    fs.readFile("./index.html","utf-8",(error,data)=>{
        if (error) {
            console.log(error)
            res.end("Error occured")
            return;
        }
        res.writeHead(200, { "content-Type": "text/html" })
        res.write(data);
        res.end()
        console.log(path.query.name)
        return;
    })

}

if(path.pathname==="/file-data"){
    let {name}=path.query
    fs.writeFile("./data/"+name+".json",JSON.stringify(path.query),(error)=>{
        if(error){
            console.log(error)
            res.end("error occured")
            return;
    }
    res.end("data added")
})

}

if(path.pathname==="/user-details"){
    let {name}=path.query
    fs.readFile("./data/"+name+".json",(error,data)=>{
        if(error){
            console.log(error)
            res.end("error occured")
            return;
        }
       
            res.write(data)
            res.end()
        })

}
if(path.pathname==="/directory"){
    fs.readdir("./data",(error,data)=>{
        let filePromise=data.map(item=>readFile("./data/"+item))
        Promise.all(filePromise)
        .then(result=>{
            res.write(JSON.stringify(result))
            res.end()
        })
    })
}
function readFile(url){
    return new Promise((res,rej)=>{
        fs.readFile(url,"utf-8",(error,data)=>{
            if(error) rej(error);
            res(JSON.parse(data))
        })
    })
}


})


server.listen(3000,error=>{
    if(error){
        console.log(error)
        return;
    }
  console.log("sever satarted")
})