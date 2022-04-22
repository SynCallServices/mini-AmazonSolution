import React, { useState } from 'react'
import { Box, Icon, Theme, Button, useTheme, SimpleGrid, IconButton } from '@chakra-ui/react';
import { FaVideoSlash, FaDownload, FaCamera, FaVideo } from 'react-icons/fa';
// @ts-ignore
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc';
// @ts-ignore
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'


const MainRecorder = () => {
    const theme: Theme = useTheme();
    const [recorder, setRecorder] = useState<RecordRTC | null>()
    const [stream, setStream] = useState<MediaStream | null>()
    const [video, setVideo] = useState<Blob | null>()
    const [type, setType] = useState<'video' | 'screen'>('video')

    const startRecording = async () => {
        const mediaDevices = navigator.mediaDevices
        const stream: MediaStream = await mediaDevices.getUserMedia({
            video: true,
            audio: true,
        })
        await new RecordRTCPromisesHandler(stream, { type: 'video' }).startRecording();
        setRecorder(recorder);
        setStream(stream);
    }

    const stopRecording = async () => {
        await recorder?.stopRecording();
        setVideo(await recorder?.getBlob());
        setStream(null)
        setRecorder(null)

    }

    const changeType = () => {
        if (type == 'screen') {
            setType('video');
        } else {
            setType('screen');
        }
    }

    const videoSrc = () => {
        if(!video){ return }
        return window.URL.createObjectURL(video); 
    }

    return (
        <SimpleGrid p='5' spacing='5'>
            <Box display='flex' justifyContent='center'
                flexDirection={[
                    'column',  // 0-30em
                    'row', // 30em-49em
                    'row', // 48em-62em
                    'row' // 62em+
                ]}

                mb='5'
            >
                <Button m='1' bg={theme.colors.blue[600]} size='lg' color='white' onClick={changeType}>
                    {type == 'video' ? 'Record Video' : 'Record Screen'}
                </Button>
                <IconButton
                    m='1'
                    bg={theme.colors.blue[500]}
                    size='lg'
                    aria-label='start-recording'
                    color='white'
                    icon={<Icon as={FaCamera} 
                    onClick={startRecording}    
                />}
                />
                <IconButton
                    m='1'
                    bg={theme.colors.blue[500]}
                    size='lg'
                    aria-label='stop-recording'
                    color='white'
                    onClick={stopRecording}
                    icon={<Icon as={FaVideoSlash} />}
                />
                <IconButton
                    m='1'
                    bg={theme.colors.blue[500]}
                    size='lg'
                    aria-label='download-recording'
                    color='white'
                    icon={<Icon as={FaDownload} />}
                />
            </Box>

            <Box display='flex' justifyContent='center' >
                <Box h='50vh'
                    width={['100%', '100%', '50vw', '50vh']}
                    bg={  !!video ? 'inherit' : 'blue.50' }
                >
                    {!!video && <Player src={videoSrc}/>}
                </Box>
            </Box>

        </SimpleGrid>
    )
}


export default MainRecorder