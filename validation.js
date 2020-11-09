const Joi = require('joi')

const validate = (body) => {
    const schema = Joi.object(
        {
            title: Joi.string().min(3).max(30).required(),
            category: Joi.string().min(3).max(15).required(),
            stat: Joi.string().min(7).max(10).required()
        }
        
    )
    
    const validation = schema.validate(body)
    
        if(!validation.error) return {
        status:200
            }
        return {
            status:400,
            error: validation.error.details[0].message
        }
    }

    const validateStat = (stat) => {
        if (stat === 'Watched' || stat === 'Must Watch') return {
            status: 200
        }
        else return {
            status: 400,
            error: 'Bad Status'
        }
    }

    const validateUpdStatus = (oldStat, newStat) => {
        if (oldStat === newStat) {
            return { 
            status: 400,
            error: `${newStat} already set.`
            } 
        } else {
            return {
            status: 200,
            oldStat: oldStat,
            newStat: newStat
        }
    }
}
    
    
    module.exports = {
        validate,
        validateStat,
        validateUpdStatus
    }