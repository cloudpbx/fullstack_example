import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, } from 'reactstrap'
import './index.scss'

function Main() {

    const history = useNavigate()

    return (
        <>

            <h2 className='space'>
                Main Page
            </h2>
            <div className='mt-2'>
                This application demonstrates the operations of task management using the serverless data dynamoDB
            </div>
            <div className='mt-4'>
                <Button
                    type='button'
                    onClick={() => {
                        history('/task/list')
                    }}
                >
                    Head to Task List Component
                </Button>
            </div>
        </>
    )
}

export default Main