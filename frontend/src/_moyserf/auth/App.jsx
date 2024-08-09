import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AuthProvider from "./AuthProvider";
import PrivateRoute from "./PrivateRoute.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                        {/* Other routes */}
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;