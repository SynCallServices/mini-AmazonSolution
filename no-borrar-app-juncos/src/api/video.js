import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createVideo, updateVideo, deleteVideo } from "../graphql/mutations";
import { listVideos } from '../graphql/queries';


// CRUD for dynamoDB

async function videoAdd({ videoId, agentId, videoPath }) {
    try {
        await API.graphql(graphqlOperation(createVideo,
            { input: { videoId, agentId, videoPath } }))
    } catch (error) {
        console.log('Error creating Video 🥴 ', error)
    }
}

async function videoGetAll() {
    try {
        const videosData = await API.graphql(graphqlOperation(listVideos))
        return videosData.data.listVideos.items;

    } catch (error) {
        console.log('Error fetching Videos 🥴', error);
    }
}

async function videoDelete({ videoId }) {
    if (videoId === "") return;
    try {
        await API.graphql(graphqlOperation(deleteVideo,
            { input: { id: videoId } }))

    } catch (error) {
        console.log('Error deleting Video 🥴', error);
    }
}

async function videoUpdate({ videoId }) {
    try {

    } catch (error) {

    }
}

// S3 Functions

async function uploadS3(file) {
    try {
        await Storage.put(file.name, file)
    } catch (error) {
        console.log("Error uploading file: ", error)
    }
}

async function deleteS3() {

}

