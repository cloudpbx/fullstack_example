import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./Styling/App.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "reactstrap";

const Main = React.lazy(() => import("./Components/Home/Main/index.tsx"))
const TaskList = React.lazy(() => import("./Components/Home/Form/List/index.jsx"))

const App = () => {

    return (
        <div className="App">
            <Container>
                <BrowserRouter>
                    <Routes>

                        <Route
                            path='/'
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <Main />
                                </React.Suspense>
                            }
                        />
                        <Route
                            path='/task/list'
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <TaskList />
                                </React.Suspense>
                            }
                        />

                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    )
}

export default App