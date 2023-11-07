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
    fs.writeFile("./data/"+name+".json",JSON.stringify(name),(error)=>{
        if(error){
            console.log(error)
            res.end("error occured")
            return;
    }
    res.end("data added")
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