import React, { useState } from "react";

const Authenticate: React.FC<{
    getUser: (user:{name:string, password:string}) => void;
    createUser: (user:{name:string, password:string}) => void;
}> = ({getUser, createUser}) => {

    const [name, setUserName] = useState("");
    const [password, setUserPassword] = useState("");

    const [newName, setUserNewName] = useState("");
    const [newPassword, setUserNewPassword] = useState("");

    return (
        <div>
            <div>
                <div>
                    <h2>GET USER</h2>
                    <input type="text" value={name} onChange={(e) => setUserName(e.currentTarget.value)} placeholder={"name"}/>
                    <input type="text" value={password} onChange={(e) => setUserPassword(e.currentTarget.value)} placeholder={"password"}/>
                </div>
                <button onClick={() => getUser({name:name, password:password})}>get user</button>
            </div>

            <div>
                <div>
                    <h2>CREATE USER</h2>
                    <input type="text" value={newName} onChange={(e) => setUserNewName(e.currentTarget.value)} placeholder={"name"}/>
                    <input type="text" value={newPassword} onChange={(e) => setUserNewPassword(e.currentTarget.value)} placeholder={"password"}/>
                </div>
                <button onClick={() => createUser({name:newName, password:newPassword})}>create user</button>
            </div>
        </div>
    );
};

export default Authenticate;
