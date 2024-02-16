const RealEstate = require('../models/realEstateModel')
const Agent = require('../models/agentsModel')
const ContactGeneral = require('../models/contactGeneral')
const User = require('../models/userModel')
const ContactRealEstate = require('../models/contactRealEstate')
exports.approveRealEstate = async (req, res) => {
    try {
        req.params.id
        const category = req.body.category;
        const realEstateId = req.body.realEstateId;
        const updatedRealEstate = await RealEstate.findOneAndUpdate(
            { _id: realEstateId },
            { $set: {category: category, approved: true} },
            { new: true},
        )

        if(!updatedRealEstate) {
            return res.status(404).json({error: 'realEstate not found'});
        }

        return res.status(200).json({updatedRealEstate});
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
}

exports.disapproveRealEstate = async (req, res) => {
    try {
        const realEstateId = req.body.realEstateId;
        const updatedRealEstate = await RealEstate.findOneAndUpdate(
            { _id: realEstateId },
            { $set: {approved: false} },
            { new: true }
        )

        if(!updatedRealEstate) {
            return res.status(404).json({error: 'realEstate not found'});
        }

        return res.status(200).json({updatedRealEstate});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

exports.approveAgent = async (req, res) => {
    try {
        const agentId = req.body.agentId;
        const updatedAgent = await Agent.findOneAndUpdate(
            { _id: agentId },
            { $set: {approved: true }},
            { new: true }
        )
        return res.status(200).json({updatedAgent})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.disapproveAgent = async (req, res) => {
    try {
        const agentId = req.body.agentId;
        const updatedAgent = await Agent.findOneAndUpdate(
            { _id: agentId },
            { $set: {approved: false }},
            { new: true }
        )
        return res.status(200).json({updatedAgent})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.saveGeneralContactMessage = async (req, res) => {
    console.log("req", req.body)
    const newContactMessage = new ContactGeneral({
        clientId: req.body.clientId,
        category: req.body.category,
        content: req.body.content,
    });
    
    console.log('newContactMessage', newContactMessage)
    
    await newContactMessage.save((error) => {
        if(error) {
            return res.status(404).json({message: 'error'});
        }else {
            return res.status(200).json('success');
        } 
    })
}

exports.fetchGeneralContactMessages = async (req, res) => {
    const clientId = req.query.clientId;
    try {
        const contactMessages = await ContactGeneral.find({clientId: clientId}).populate({
            path: 'clientId',
            select: '_id name',
        }).sort({createdAt: 1});
        return res.status(200).json({contactMessages});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

exports.savePostContactMessage = async (req, res) => {

    console.log('req parameter', req.body)
    const newContactMessage = new ContactRealEstate({
        realEstateId: req.body.realEstateId,
        poster: req.body.posterId,
        category: req.body.category,
        content: req.body.content,
    });

    await newContactMessage.save((error) => {
        if(error) {
            return res.status(404).json({message: 'error'});
        } else {
            return res.status(200).json('success');
        }
    })
}

exports.fetchPostContactMessages = async (req, res) => {
    try {
        const contactMessages = await ContactRealEstate.find({realEstateId: req.query.realEstateId}).populate({
            path: 'poster',
            select: '_id name',
        }).sort({createdAt: 1});
        console.log('I am here', contactMessages)
        return res.status(200).json({contactMessages});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

exports.fetchContactMessagesByAdmin = async (req, res) => {
    const firstNumber = req.query.firstNumber;
    const lastNumebr = req.query.lastNumebr;
    const category = req.query.category;
    console.log('I am here', req.query);
    if(category === 'all') {
        try {
            const contactMessages = await ContactGeneral.find().populate({
                path: 'clientId',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactGeneral.countDocuments();
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    if(category === 'received-all') {
        try {
            const contactMessages = await ContactGeneral.find({category: 'query'}).populate({
                path: 'clientId',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactGeneral.countDocuments({category: 'query'});
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    if(category === 'received-unread') {
        try {
            const contactMessages = await ContactGeneral.find({category: 'query', status: 'unread'}).populate({
                path: 'clientId',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactGeneral.countDocuments({category: 'query', status: 'unread'});
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    if(category === 'sent') {
        try {
            const contactMessages = await ContactGeneral.find({category: 'reply'}).populate({
                path: 'clientId',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactGeneral.countDocuments({category: 'reply'});
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

exports.fetchPostContactMessagesByAdmin = async (req, res) => {
    const firstNumber = req.query.firstNumber;
    const lastNumebr = req.query.lastNumebr;
    const category = req.query.category;
    console.log('I am here', req.query);
    if(category === 'all') {
        try {
            const contactMessages = await ContactRealEstate.find().populate({
                path: 'poster',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactRealEstate.countDocuments();
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    if(category === 'received-all') {
        try {
            const contactMessages = await ContactRealEstate.find({category: 'query'}).populate({
                path: 'poster',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactRealEstate.countDocuments({category: 'query'});
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    if(category === 'received-unread') {
        try {
            const contactMessages = await ContactRealEstate.find({category: 'query', status: 'unread'}).populate({
                path: 'poster',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactRealEstate.countDocuments({category: 'query', status: 'unread'});
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    if(category === 'sent') {
        try {
            const contactMessages = await ContactRealEstate.find({category: 'reply'}).populate({
                path: 'poster',
                select: '_id name',
            }).sort({createdAt: 1}).skip(firstNumber-1).limit(lastNumebr-firstNumber+1);
            console.log('contactMessages', contactMessages)
            const totalNumber = await ContactRealEstate.countDocuments({category: 'reply'});
            return res.status(200).json({contactMessages, totalNumber});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}