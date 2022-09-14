import React from 'react'
import NewChatDummy from './components/NewChatDummy'

function Home() {
  return (
    <NewChatDummy from={"1"} to={"2"} fromName="sam" toName="ann" room="room1" />
  )
}

export default Home