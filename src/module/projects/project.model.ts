import mongoose from "mongoose";

export interface ProjectDocument {
    title: string;
    photos: [string];
    QR?: string;
};

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please insert a title."]
    },
    photos: {
        type: [String],
        required: [true, "Please upload photos!!!"]
    },
    QR: {
        type: String
    }
});

export const Project = mongoose.model<ProjectDocument>('project', projectSchema);