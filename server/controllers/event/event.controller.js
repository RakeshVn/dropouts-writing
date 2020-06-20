const controller = module.exports
const formidable = require('formidable');
const path = require('path');
const mv = require('mv');


const AuditModel = require('../../models/audit.model')
const QueryModel = require('../../models/query.model')
const WriterModel = require('../../models/writer.model')

const CountsModel = require('../../models/counts.model');
const auditModel = require('../../models/audit.model');
const writerModel = require('../../models/writer.model');
const queryModel = require('../../models/query.model');

controller.get = async function (req, res) {

    try {

        const { body, query } = req
        const limit = 10
        const skip = (Number(query.page) - 1) * limit

        const eventData = await EventModel.find({}).skip(skip).limit(limit).sort({ _id: -1 })
        const totalRecords = await EventModel.countDocuments({})

        return res.status(200).send({ message: 'success', data: eventData, totalRecords })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.dashboard = async function (req, res) {

    try {

        const eventData = await EventModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            }
        ])

        const eventTypeData = await EventModel.aggregate([
            {
                $group: {
                    _id: { type: "$type", date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } },
                    count: { $sum: 1 }
                }
            }
        ])

        const dashboardData = {
            total: 0,
            today: 0,
            yesterday: 0,
            registeredGraphData: eventData,
            eventsTypeGraphData: eventTypeData
        }
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);

        for (const iterator of eventData) {
            dashboardData.total += iterator.count
            if (today == iterator._id) dashboardData.today = iterator.count
            if (yesterday == iterator._id) dashboardData.yesterday = iterator.count
        }

        return res.status(200).send({ message: 'success', data: dashboardData })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.create = async function (req, res) {

    try {

        const { body } = req
        const regNumber = `${body.type.toUpperCase()}-${(await CountsModel.findOneAndUpdate({ name: body.type }, { $inc: { count: 1 } }, { upsert: true, new: true })).count}`

        const eventData = await new EventModel({ ...body, regNumber }).save()

        return res.status(200).send({ message: 'success', data: eventData })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.upload = async function (req, res) {

    try {

        const { params } = req
        const form = new formidable.IncomingForm();
        const extensionRegex = /(?:\.([^.]+))?$/;

        form.parse(req, async (err, fields, files) => {

            const file = files.file
            const fileName = `${Date.now()}.${extensionRegex.exec(files.file.name)[1]}`
            const destPath = path.join('id_cards', fileName)

            mv(file.path, destPath, async function (error) {

                if (error) {
                    console.error(error)
                }

                await EventModel.findOneAndUpdate({ _id: params.id }, { $set: { idCard: fileName } })

                return res.status(200).send({ message: 'success' })

            });


        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.action = async function (req, res) {

    try {

        const { params, body } = req

        let updatedData = {}

        if (params.type == 'audit') {
            updatedData = await AuditModel.findOneAndUpdate({ _id: params.id }, {
                $set: {
                    accepted: body.accepted
                }
            })
        } else if (params.type == 'writer') {
            updatedData = await WriterModel.findOneAndUpdate({ _id: params.id }, {
                $set: {
                    accepted: body.accepted
                }
            })
        } else if (params.type == 'query') {
            updatedData = await QueryModel.findOneAndUpdate({ _id: params.id }, {
                $set: {
                    accepted: body.accepted
                }
            })
        }

        return res.status(200).send({ message: 'success', data: updatedData })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}


/**
 * 
 * Content Audit
 * 
 * @postAudit   - Saves form data
 * @getAudit    - Retrieves saved data
 * 
 */

controller.postAudit = async function (req, res) {

    try {

        const { body } = req
        const data = await new AuditModel({ ...body }).save()

        return res.status(200).send({ message: 'success' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.getAudit = async function (req, res) {

    try {

        const { body, query } = req
        const limit = 10
        const skip = (Number(query.page) - 1) * limit

        const eventData = await AuditModel.find({}).skip(skip).limit(limit).sort({ _id: -1 })
        const totalRecords = await AuditModel.countDocuments({})

        return res.status(200).send({ message: 'success', data: eventData, totalRecords })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

/**
 * 
 * Content Audit
 * 
 * @postWriter   - Saves form data
 * @getWriter    - Retrieves saved data
 * 
 */

controller.postWriter = async function (req, res) {

    try {

        const { body } = req
        const data = await new WriterModel({ ...body }).save()

        return res.status(200).send({ message: 'success' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.getWriter = async function (req, res) {

    try {

        const { body, query } = req
        const limit = 10
        const skip = (Number(query.page) - 1) * limit

        const eventData = await WriterModel.find({}).skip(skip).limit(limit).sort({ _id: -1 })
        const totalRecords = await WriterModel.countDocuments({})

        return res.status(200).send({ message: 'success', data: eventData, totalRecords })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

/**
 * 
 * Content Audit
 * 
 * @postQuery   - Saves form data
 * @getQuery    - Retrieves saved data
 * 
 */

controller.postQuery = async function (req, res) {

    try {

        const { body } = req
        const data = await new QueryModel({ ...body }).save()

        return res.status(200).send({ message: 'success' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.getQuery = async function (req, res) {

    try {

        const { body, query } = req
        const limit = 10
        const skip = (Number(query.page) - 1) * limit

        const eventData = await QueryModel.find({}).skip(skip).limit(limit).sort({ _id: -1 })
        const totalRecords = await QueryModel.countDocuments({})

        return res.status(200).send({ message: 'success', data: eventData, totalRecords })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

controller.deleteEvent = async function (req, res) {

    try {

        const { params } = req

        if (params.type == 'audit') {
            await auditModel.deleteOne({ _id: params.id })
        } else if (params.type == 'writer') {
            await writerModel.deleteOne({ _id: params.id })
        } else if (params.type == 'query') {
            await queryModel.deleteOne({ _id: params.id })
        }

        return res.status(200).send({ message: 'success' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}
