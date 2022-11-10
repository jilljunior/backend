const {MongoClient} = require('mongodb')
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)
const connection = () =>{
    try{
        client.connect()
    }catch(err){
        console.error(err)
    }
}

/**
 * Description 
 * @param {string} db_name
 * @param {{}} data={}
 * @returns {data|string}
 */
exports.insertion_video = (db_name, data = {})=>{
    connection()
    if(data != {}){
        try{
            client.db(db_name).collection('video').insertOne(data)
            return data
        }catch(err){
            console.error(err)
        }
    }
    client.close()
}
/**
 * return all videos to database
 * @param {string} db_name
 * @returns {WithId<Document[]}
 */
exports.find_videos = (db_name) => {
    connection()
    return client.db(db_name).collection("video").find() 
}
/**
 * return users from the database by id
 * @param {string} db_name
 * @param {object} Id
 * @returns {Promise<WithId<Document>|null}
 */
exports.find_user_byId = (db_name, Id) =>{
    connection()
    return client.db(db_name).collection('user').findOne({_id: Id})
    
}
/**
 * obtain a list of users prefernce and date
 * @param {string} db_name
 * @param {object} Id
 * @param {Date} date
 * @returns {FindCursor<WithId<Document>}
 */
exports.find_preference = (db_name,Id) =>{
    connection()
    return client.db(db_name).collection('preference').find({"_id":Id})
}
/**
 * insert a user preference
 * @param {string} db_name
 * @param {{}} preference
 * @returns {Promise<InsertOneResult<Document>}
 */
exports.insert_preference = (db_name, preference = {}) =>{
    connection()
    if(preference != {})
        return client.db(db_name).collection('preference').insertOne(preference)
    return preference
}

exports.find_videos_by_prefernces = (db_name, preference = '') =>{
    connection()
    if(preference == ''){
        return  client.db(db_name).collection("video").find({"active":true})
    }else{
        return client.db(db_name).collection("video").find({"categories":preference, "active":true})
    }
}

exports.update_like = (db_name, title)=>{
    connection()
    client.db(db_name).collection("video").updateOne({"title":title}, {"number_likes":10})
}