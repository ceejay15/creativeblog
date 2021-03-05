/**
 *  Endpoint App needs to point to
 *  host: "http://localhost:3002/",
    post : "create",
    edit : "edit",
    delete : "delete",
    view : "list"
 */

module.exports = {  
    //for endpoints 
    port : 5200,
    post : "create",
    edit : "edit",
    delete : "remove",
    view : "list",
    search : "get?",
    //app secret
    secret: "g00dMorn!ngK@r3nTalkTothemanager",

    //db config
    host : "mongodb://localhost:27017/spartansystem300db",
    database : "creativeblog",
    collection: "blog_entries"
}