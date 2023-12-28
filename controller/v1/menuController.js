const mongoose = require('mongoose');
const menuModel = require("../../models/menuModel")

exports.create = async (req, res) => {
    try {
        const { title, href } = req.body
        const create = await menuModel.create({
            title,
            href
        })
        return res.json(create)
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1
exports.getAll = async (req, res) => {
    try {
        const getAll = await menuModel.find({}).sort({ _id: -1 }).lean()

        if (getAll.length === 0) return res.status(404).json({ message: 'No menu found !!' })

        getAll.forEach((menu) => {
            let subMenu = []

            for (let i = 0; i < getAll.length; i++) {

                const mainMenu = getAll[i];

                if ((String(mainMenu.parent)) == (String(menu._id))) {

                    subMenu.push(getAll.splice(i, 1)[0])
                    i = i - 1

                }
            }
            menu.subMenus = subMenu
        })
        return res.json(getAll)
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1
exports.setSub = async (req, res) => {
    try {
        const { title, href } = req.body;
        const { parentID } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(parentID)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }
        const findmenu = await menuModel.findOne({ _id: parentID })
        if (!findmenu) {
            return res.status(422).json({ message: "Parent menu not found!" })
        }

        const getAll = await menuModel.create({
            title,
            href,
            parent: parentID,
        })
        return res.json(getAll)
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1
exports.remove = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const findmenu = await menuModel.findOneAndDelete({ _id: req.params.id })
        if (!findmenu) {
            return res.status(422).json({ message: "menu not found!" })
        }

        const findsub = await menuModel.deleteMany({ parent: req.params.id })

        return res.json({ message: "menu removed" })
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1
exports.removesub = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const findmenu = await menuModel.findOne({ _id: req.params.id })
        if (!findmenu) {
            return res.status(422).json({ message: "sub menu not found!" })
        }

        if (findmenu.parent) {
            const findmenu = await menuModel.findOneAndDelete({ _id: req.params.id })
        } else { return res.status(422).json({ message: "this is menu not sub menu" }) }


        return res.json({ message: "sub menu removed" })
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1