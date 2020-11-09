const connection = require ('./config/connection')
const ObjectID = require('mongodb').ObjectID


const createNoteForDoms = async(reqBody) =>{
   const client = await connection()
   await client.connect()

   try {
    const note = await client.db('doms-api').collection('notes').insertOne(reqBody)
    return{
        note : note.ops
    }
    }
   catch (error) {
    throw(error)
    }
    finally {
    client.close()

    }
}

const deleteNote = async(id) => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('doms-api').collection('notes').deleteOne({
            _id: ObjectID(id)
        })
        return {
            status : 200
        }
    }
    catch (error) {
    throw(error)
        }
        finally {
        client.close()
    
        }
}

const getAllNotes = async() => {
    const client = await connection()
    await client.connect()
    try {
        const note = await client.db('doms-api').collection('notes').find().toArray()
        return note
    }
    catch (error) {
    throw(error)
        }
        finally {
        client.close()
    
        }

}


const getNoteByName = async(title) => {
        const client = await connection()
        await client.connect();
        try {
            const note = await client.db('doms-api').collection('notes').findOne({
                title: title
            })
            return {
                status : 200,
                note: note
            }
        }
        catch (error) {
        return {
            status: 400,
            error: error
        }
            }
            finally {
            client.close()
        
            }
}

const getNoteByStat = async(stat) => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('doms-api').collection('notes').find({
            stat: stat
        }).toArray()
        return {
            status : 200,
            note: note
        }
    }
    catch (error) {
    return {
        status: 400,
        error: error
    }
        }
        finally {
        client.close()
    
        }
}

const getNoteByCategory = async(category) => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('doms-api').collection('notes').find({
            category: category
        }).toArray()
        return {
            status : 200,
            note: note
        }
    }
    catch (error) {
    return {
        status: 400,
        error: error
    }
        }
        finally {
        client.close()
    
        }
}

const getNoteById = async(id) => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('doms-api').collection('notes').findOne({
            _id: ObjectID(id)
        })
        return {
            status : 200,
            note: note
        }
    }
    catch (error) {
    throw(error)
        }
        finally {
        client.close()
    
        }
}

const updateNote = async(id, statObj) => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('doms-api').collection('notes').updateOne({
            _id: ObjectID(id)
        }, {
            $set: statObj,
        })
        

        const updtdObj = await client.db('doms-api').collection('notes').findOne({
            _id: ObjectID(id)
        })

        return {
            status : 200,
            note: updtdObj
        }
    }
    catch (error) {
        return {
            status: 400,
            error: error
        }
        }
        finally {
        client.close()
    
        }
}

module.exports = {
    createNoteForDoms,
    deleteNote, 
    getAllNotes,
    getNoteByName,
    getNoteByStat,
    getNoteByCategory,
    getNoteById,
    updateNote
    
}