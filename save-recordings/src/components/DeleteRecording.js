import '../assets/styles/connections.css'
import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteVideoRecordings } from '../graphql/mutations';
import { listVideoRecordings } from '../graphql/queries';

const initialState = { id: "" };

function DeleteRecording() {
    const [state, setState] = useState(initialState);
    const [deletedMsg, setDeletedMsg] = useState(null);
    const [optionsList, setOptionsList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const setInput = (key, value) => {
        setState({ ...state, [key]: value });
    };

    async function deleteVideoRecording() {
        try {
            if (state.id === "") return;
            await API.graphql(graphqlOperation(deleteVideoRecordings, {input: { id: state.id }}))
            setDeletedMsg(
                <div>
                    <p>Video with id: {state.id}</p>
                    <p> Deleted Successfully</p>
                </div>
            );
            setInputValue('');
            optionAllVideos();
        } catch (err) {
            console.error("Error deleting Video recording.", err.errors[0]);
        }
    }

    async function optionAllVideos() {
        try {
            // API call's the "listVideoRecordings" query. This call will return an object that contains all of our videoRecordings.
            const videoRecordingsData = await API.graphql(graphqlOperation(listVideoRecordings))
            // Once api call is complete, extract all of video recordings into a list.  
            const videoRecordings = videoRecordingsData.data.listVideoRecordings.items.map( (item, i) => {
                return <option key={i}>{item.id}</option>;
            });
            videoRecordings.unshift(<option>-</option>)
            setOptionsList(videoRecordings);

        } catch (err) {console.log('Error fetching Video recordings.', err.errors[0])}
        
    }

    useEffect ( () => {
        optionAllVideos();
    }, []);

    return (
        <div>
            <select
                onChange={(event) => {
                    setInput("id", event.target.value);
                    setInputValue(event.target.value);
                }}
                value={inputValue}
            >{optionsList}</select>
            <button onClick={deleteVideoRecording}>Delete</button>
            {deletedMsg ? deletedMsg : null}
        </div>
    );
}

export default DeleteRecording;