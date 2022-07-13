import { useContext } from 'react'
import moment from 'moment';
import { GlobalInfo } from "../Home/Home"

function ChatMessage() {
    const { allMessage } = useContext(GlobalInfo)
    return (
        <>
            <ul >
                {allMessage.map((msg) => {
                    return (
                        <li style={{ listStyleType: "none" }} key={msg._id} >
                            <div className="d-flex justify-content-center">
                                <span style={{ fontSize: "12px", color: "gray", marginTop: "7px" }}>{moment(msg.createdAt).calendar()}</span><br />
                            </div>
                            <div style={{ marginRight: "30px" }}>
                                {msg.type === "send" ?
                                    <div className="d-flex justify-content-end">

                                        <span className="badge bg-success">{msg.message}</span>
                                    </div>
                                    :
                                    <span className="badge bg-primary ">{msg.message}</span>
                                }

                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ChatMessage