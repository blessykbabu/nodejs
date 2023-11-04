const http= require("http")   //these http module is sent request
const url=require ("url")
const fs=require ("fs")
const server=http.createServer((req,res)=>{     //create server using http module

 const path=url.parse(req.url,true)  //to get the path --->"/home?user"then get the home 
console.log(req.url);
    if(path.pathname === "/about"){
        res.writeHead(200,{"content-Type":"text/html"})   //writeHead is used to write content on the response body
       res.write("<h1>This is a about page</h1>")
       res.end()
       return;
    }
    if(path.pathname=== "/home"){     //

fs.readFile("./index.html","utf-8",(error,data)=>{
    if(error){
        console.log(error)
        res.end("Error occured")
        return;
    }
    res.writeHead(200,{"content-Type":"text/html"})
    res.write(data);
    res.end()
    return;
})


    //    res.writeHead(200,{"content-Type":"text/html"})
    //    res.write(`<form action="http://localhost:3000/api" method="get"> 
       
    //    <input type="text" name="username">
    //    <input type="submit" value="send">

    //    </form>
    //    `
    //    );

        // res.end()
        // return;
    }

    if(path.pathname ==="/api"){
        console.log(path.query)
        res.end("welcome  "  + path.query.username)
        return;
    }
    // res.write("Note found")   //commented becoz file read is a asynchrounous file
    // res.end()
});
server.listen(3000,error=>{
    if(error){
        console.log(error)
        return;
    }
  console.log("sever satarted")
})