const http=require ("http")
const url= require ("url")
const fs=require("fs")

const server=http.createServer((req,res)=>{
    const path=url.parse(req.url,true) 
    console.log(req.url)
    if(path.pathname==="/"){
        fs.readFile("./index.html","utf-8",(error,data)=>{
            if(error){
                console.log(error)
                return;
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)  //here we give data then it return the html page after successfully read the file. other wise we give a string eg:"successfully read then the page show that string"
            //res.write is return data to client to what they see
            res.end()
        })
    
    }
})
server.listen(3000,error=>{
    if(error){
        console.log("error occured")
        return;
    }
    console.log("server started on the port 3000")
})
