import React from 'react'

function Message({err}) {
    return (
        <div class="alert alert-danger" role="alert">
            {err}
        </div>
    )
}

export default Message
