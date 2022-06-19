import mongoose from "mongoose";

export function connect() {
    return mongoose.connect('mongodb+srv://kristine:supersecurepassword@cluster0.jqzes.mongodb.net/?retryWrites=true&w=majority');
}