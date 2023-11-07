const http = require("http")   //these http module is sent request
const url = require("url")
const fs = require("fs")
const server = http.createServer((req, res) => {     //create server using http module

    const path = url.parse(req.url, true)  //to get the path --->"/home?user"then get the home 
    console.log(req.url);

    if (path.pathname === "/") {     //
        
        fs.readFile("./index.html", "utf-8", (error, data) => {
            if (error) {
                console.log(error)
                res.end("Error occured")
                return;
            }
            res.writeHead(200, { "content-Type": "text/html" })
            res.write(data);
            res.end()
            return;
        })

    }


    if (path.pathname === "/set-todo") {     //
        let query = path.query;
        fs.readFile("./todos.json", "utf-8", (error, data) => {
            if (error) {
                console.log(error)
                res.end("Error occured")
                return;
            }
         let todos=data ? JSON.parse(data):[];
         todos.push(query)
         fs.writeFile("./todos.json",JSON.stringify(todos),error=>{
            if(error){
                console.log(error)
                res.end("error occured")
                return;
            }
            res.end("successfully added todo")
         })
        })

    }

    if(path.pathname==="/get-todo"){
        fs.readFile("./todos.json","utf-8",(error,data)=>{
            if(error){
                console.log(error)
                res.end("error occured")
                return;
            }
            res.writeHead(200,{"Content-Type":"application/json"});
            res.write(data)
            res.end()
        })
    }


    if(path.pathname==="/del-todo"){
        let{id}=path.query
        fs.readFile("./todos.json","utf-8",(error,data)=>{
            if(error){
                console.log(error)
                res.end("error occured")
                return;
            }
            let todos=data ? JSON.parse(data):[];
            todos=todos.filter((item,index)=>index !=id)
            fs.writeFile("./todos.json",JSON.stringify(todos),error=>{
                if(error){
                    console.log(error)
                    res.end("error occured")
                    return;
                }
                res.end("TODO ADDED SUCCESSFULLY")
            })
        })
    }


    if(path.pathname==="/edit-todo"){
        // fs.readFile("./todos.json","utf-8",(error,data)=>{
        //     if(error){
        //         console.log(error)
        //         res.end("error occured")
        //         return;
        //     } 
            
        // })
      res.writeHead(200,"Conteny-Type":"text")
        res.write("you are click edit button")
            res.end()
    }
    


});
server.listen(3000, error => {
    if (error) {
        console.log(error)
        return;
    }
    console.log("sever satarted")
})