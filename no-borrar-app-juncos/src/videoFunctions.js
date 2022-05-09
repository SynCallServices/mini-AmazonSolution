// AWS
import { Amplify, API, graphqlOperation, Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
// GraphQl
import { createVideo } from './graphql/mutations';
import { listVideos } from './graphql/queries';

// Necessary amplify configuration
Amplify.configure(awsconfig);


export async function fetchVideos() {
    try {
        const videoData = await API.graphql(graphqlOperation(listVideos));
        const videoList = videoData.data.listVideos.items;
        console.log('videos external', videoList); // -> just for testing 
        // videoList returns a dictionary for the front end to display
        return videoList;
    } catch (error) { console.log('Error fetching Videos 🥴', error); }
}

export async function uploadToS3(file) {
    try {
        if (file) {
            await Storage.put(file.name, file);
        }
    } catch (error) {
        console.log('Error uploading video to S3 🥴 ', error);
    }
}

export async function uploadToDynamo(videoData) {
    try {
        if (videoData.videoId && videoData.videoPath) {
            await API.graphql(graphqlOperation(createVideo, { input: videoData }));
        }
    } catch (error) {
        console.log('Error uploading video to Dynamo 🥴 ', error);
    }
}

export async function uploadAll(videoData, file) {
    // console.log('successfully got into uploadAll external function');
    console.log(file);
    console.log(videoData);
    try {
        if (file && videoData.videoId && videoData.videoPath) {
            console.log('Data was sent correctly');
            await API.graphql(graphqlOperation(createVideo, { input: videoData }));
            await Storage.put(file.name, file);
        }
    } catch (error) {
        console.log('Error uploading somewhere 🥴 ', error);
    }
}

export function s3Files() {
    // console.log('got into s3Files  function');
    Storage.list('')
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

// export async function fileUploaded(e) {
//     file = e.target.files[0];
// }
// export async function addVideo(info) {
//     try {
//         if (!info.videoId || !info.videoPath) return;
//         const videoUpload = { ...state };
//         setVideoRecordings([...videoRecordings, videoUpload]);
//         setState(video);
//         await Storage.put(file.name, file)
//         // Create a video
//         await API.graphql(graphqlOperation(createVideo, { input: videoUpload }));
//     } catch (error) { console.log('Error uploading video 🥴 ', error); }
//     return window.location.reload();
// }

