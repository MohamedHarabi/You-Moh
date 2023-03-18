import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI';

function ChannelDetail() {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]))
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div 
          style={{
            background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(214,170,74,1) 100%)',
            zIndex: 10,
            height: '217px'
          }} 
        />
          <ChannelCard channelDetail={channelDetail} marginTop='-100px' />
      </Box>
      <Box display='flex' p='2'>
          <Box sx={{ mr: { sm: '95px' } }}/>
          <Videos videos={videos} />     
      </Box>
    </Box>
  )
}

export default ChannelDetail