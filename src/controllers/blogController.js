const { count } = require("console")
const BlogModel = require("../models/blogModel")
const AuthorModel = require("../models/authorModel")


const createBlog = async function (req, res) {
    try {
        let data = req.body
        let id = req.body.authorId
        // checking if data is empty
        if (Object.keys(data) == 0)
            // returning 400 {bad request data is empty}
            return res.status(400).send({ status: false, msg: "Bad request. Content to post missing" })

        let idMatch = await AuthorModel.findById(id)
        // id match in author model, if not
        if (!idMatch)
            // returning error with 404 user input does not match
            return res.status(404).send({ status: false, msg: "No such author present in the database" })

        let savedData = await BlogModel.create(data)
        //creating entry in db with status 201 success!
        return res.status(201).send({ status: true, msg: savedData })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}



const updateBlog = async function (req, res) {
    try {
        //Validate: The blogId is present in request path params or not.
        let blog_Id = req.params.blogId
        if (!blog_Id) return res.status(400).send({ status: false, msg: "Blog Id is required" })

        //Validate: The blogId is valid or not.
        let blog = await BlogModel.findById(blog_Id)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog does not exists" })

        //Validate: If the blogId exists (must have isDeleted false)
        let is_Deleted = Object.keys(blog).find(isDeleted => blog[isDeleted] === true)
        if (is_Deleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        //Updates a blog by changing the its title, body, adding tags, adding a subcategory.
        let Title = req.body.title
        let Body = req.body.body
        let Tags = req.body.tags
        let Subcategory = req.body.subcategory
        let updatedBlog = await BlogModel.findOneAndUpdate({ _id: blog_Id },
            {
                $set: {
                    title: Title, body: Body, isPublished: true, subcategory: Subcategory,
                    tags: Tags
                }
            }, { new: true })
        //Sending the updated response
        res.status(200).send({ status: true, data: updatedBlog })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ status: false, msg: " Server Error", error: err.message })
    }
}



const deleted = async function (req, res) {
    try {
        //Validate: The blogId is present in request path params or not.
        let blog_Id = req.params.blogId
        if (!blog_Id) return res.status(400).send({ status: false, msg: "Blog Id is required" })

        //Validate: The blogId is valid or not.
        let blog = await BlogModel.findById(blog_Id)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog does not exists" })

        //Validate: If the blogId is not deleted (must have isDeleted false)
        let is_Deleted = Object.keys(blog).find(isDeleted => blog[isDeleted] === true)
        if (is_Deleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        //Delete a blog by changing the its isDeleted to true.
        let deletedBlog = await BlogModel.findOneAndUpdate({ _id: blog_Id },
            { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        //Sending the Deleted response after updating isDeleted : true
        res.status(200).send({ status: true, data: deletedBlog })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ status: false, msg: " Server Error", error: err.message })
    }
}

const Qdeleted = async function (req, res) {
    try {
        const authorId = req.query.authorId;
        const category = req.query.category;
        const tags = req.query.tags;
        const subcategory = req.query.subcategory;
        const isPublished = req.query.isPublished;

        //Validate :  All fields (category, authorid, tag name, subcategory name, unpublished
        // if (!autherid || !category || !tag || !subcategory || !unpublished) {
        //     return res.status(400).send({ status: false, msg: "Please enter all the necessary fields" })
        // }

        const Del = await BlogModel.find({
            $or: [
                { authorId: authorId },
                { category: category },
                { tag: tags },
                { subcategory: subcategory },
                { unpublished: isPublished },
            ],
        }).select({ isDeleted: 1 });

        //When condition isDeleted  is false and then we are going to update it
        if (Del === false) {
            const PDeleted = await Del.updateMany(
                { $set: { isDeleted: true, deletedAt: new Date() } },
                { new: true });

            res.status(200).send({ status: true, data: PDeleted });
        }
        else if (Del === true) { res.status(404).send("user already deleted") }

    }//when serverside error occur
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};



const getAllBlogs = async function (req, res) {
    try {

        let authorId = req.query.authorId;
        let tags = req.query.tags;
        let category = req.query.category;
        let subCategory = req.query.subcategory;

        let retBlogs = [];

        // const blogs = await blogsModel.find({$and :[{isDeleted: false},{isPublished:true}]});
        const blogs = await BlogModel.find({ isDeleted: false, isPublished: true });
        if (!blogs) {
            res.status(404).send({ status: false, msg: "No blogs Available." });
        }
        else {
            // let result = await BlogModel.find({ $or: [{ authorId: req.query.authorId }, { tags: req.query.tags }, { category: req.query.category }, { subcategory: req.query.subcategory }] });
            for (let i = 0; i < blogs.length; i++) {

                if (null != authorId && blogs[i].authorId != authorId) continue;
                if (null != tags && blogs[i].tags != tags) continue;
                if (null != category && blogs[i].category != category) continue;
                if (null != subCategory && blogs[i].subCategory != subCategory) continue;

                retBlogs.push(blogs[i]);
            }
            res.status(200).send({ status: true, data: retBlogs });
        }
    }

    catch (error) {
        res.status(500).send({ status: false, error: error });
    }
}




module.exports.createBlog = createBlog
module.exports.updateBlog = updateBlog
module.exports.deleted = deleted
module.exports.getAllBlogs = getAllBlogs
module.exports.Qdeleted = Qdeleted