const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const validation = require('./validation')
const service = require('./service')

app.use(bodyParser.json())

app.listen(3001, () => {
    console.log('doms-api is running at port 3001')
})

app.post('/createNoteForDoms', async(req,res) => {
    const validateObj = await validation.validate(req.body)
    if(validateObj.status !== 200) res.send(validateObj.error)
    else {
        const validatedStatus = await validation.validateStat(req.body.stat)
        if (validatedStatus.status === 400) res.send(validatedStatus.error)
        else {
            const note = await service.createNoteForDoms(req.body)
            res.send(note)
        }
        
    }
})

app.delete('/deleteNote/:id', async(req,res) => {
    const note = await service.deleteNote(req.params.id)
    if (note.status) res.send('Note deleted!')
    else res.send('Please insert a valid ID!')
})

app.get('/listNotes', async(req,res) => {
    const note = await service.getAllNotes()
    res.send(note)
})



app.get('/getNoteByName/:title', async(req,res) => {
    const note = await service.getNoteByName(req.params.title)
    if(note.status !== 200) res.send(error)
    else res.send(note)
})

app.get('/getNoteByStat/:stat', async(req,res) => {
    const validateStatus = await validation.validateStat(req.params.stat)
    if (validateStatus.status === 400) res.send(validateStatus.error)
        else {
            const note = await service.getNoteByStat(req.params.stat)
            if(note.status === 400) res.send(error)
            else res.send(note.note)
        }

})

app.get('/getNoteByCategory/:category', async(req,res) => {
    const note = await service.getNoteByCategory(req.params.category)
    if(note.status !== 200) res.send(error)
    else res.send(note.note)
})


app.put('/updateNote/:id', async(req,res) => {
    const note = await service.getNoteById(req.params.id)
    if(note.status !== 200) res.send(error)
    else {
        const validateStat = await validation.validateUpdStatus(note.note.stat, req.body.stat)
        if (validateStat.status === 400) res.send(validateStat.error)
        else {
            const validatedStat = {
                stat: validateStat.newStat,
                updatedAt: new Date()
            }
            
            const updatedNote = await service.updateNote(req.params.id, validatedStat)
            if (updatedNote.status !== 200) res.send(updatedNote.error)
            else res.send(updatedNote.note)
        }
    }
})