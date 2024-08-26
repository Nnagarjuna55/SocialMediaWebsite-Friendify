// // //Imports the mongoose library, which is used for interacting with MongoDB and defining schemas and models.
// const mongoose = require("mongoose");
// //Creates a new schema for the Post collection using mongoose.Schema. This schema defines the structure and constraints of the documents within the posts collection.
// const PostSchema = new mongoose.Schema({
//     //userId: A string field that is required. This field stores the ID of the user who created the post.
//     userId: {
//         type: String,
//         required: true,
//     },

//     //desc: A string field that is required. This field stores the description of the post. It must be between 10 and 100 characters in length (min and max are validators).
//     desc: {
//         type: String,
//         required: true,
//         min: 10,
//         max: 100,
//     },

//     //imageUrl: A string field that is required. This field stores the URL of the image associated with the post.
//     imageUrl: {
//         type: String,
//         required: true,
//     },

//     //likes: An array field that stores the IDs of users who liked the post. It defaults to an empty array if no likes are present initially.
//     likes: {
//         type: Array,
//         default: []
//     }

//     //{ timestamps: true }: Adds createdAt and updatedAt fields to the schema. These fields are automatically managed by Mongoose to track when a document is created and last updated.
// }, { timestamps: true });

// //Exports the Post model created from PostSchema. This model allows you to perform CRUD operations on the posts collection in the MongoDB database.
// module.exports = mongoose.model("Post", PostSchema);


const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 10,
        max: 100,
    },
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
    },
    likes: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
