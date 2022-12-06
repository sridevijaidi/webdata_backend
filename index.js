const http = require('http');
const path = require('path');
const fs= require("fs");

const server = http.createServer((req, res)=>{

    console.log("Request URL : ", req.url)

    let filePath= path.join(__dirname, 'public', req.url==='/' ? 'index.html':req.url );

    console.log(filePath)

    let extname = path.extname(filePath)
    console.log("Ext: ", extname)

    // based on extention .json Cotnent-Type = application/json
    // html , css, javascript, json
    switch(extname){
        case '.css':
            contentType= 'text/css';
            break;
        case '.vue':
            contentType= 'text/vue';
            break;
        case '.js':
            contentType= 'text/javascript';
            break;
        case '.json':
            contentType= 'application/json';
            break;
        case '.html':
                contentType= 'text/html';
                break
        
    }
    console.log(contentType)

    // readthe file
    fs.readFile(filePath, (err, content)=>{
            // err.code
            if(err) {

                        if(err.code = 'ENONET'){ // file dont exist 
                            // display the 404 page here
                            fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{ 
                                res.writeHead(200, {"Content-Type": 'text/html'});
                                res.end(content, 'utf-8')

                            });
                                    
                        }
                        else{
                            res.writeHead(500);
                            res.end(`server error ${err.code}` );
                        }
    

            }else{
                //sucess
                res.setHeader("Access-Control-Allow-Origin", "*") 
                res.writeHead(200, {'Content-Type':contentType})
                res.end(content, 'utf-8')



            }



    });


    
   





});



const PORT = process.env.PORT || 4304;
server.listen(PORT,()=> console.log(`Great our server is working ${PORT}`)) 

// nodemonå