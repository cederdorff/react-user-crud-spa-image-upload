import { useEffect, useState } from "react";

export default function UserForm({ user = {}, reload }) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [mail, setMail] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (user.id) {
            setName(user.name);
            setTitle(user.title);
            setMail(user.mail);
            setImage(user.image);
        }
    }, [user]);

    function saveUser(event) {
        event.preventDefault();

        if (user.id) {
            updateUser();
        } else {
            createUser();
        }
    }

    async function createUser() {
        const newUser = {
            name,
            title,
            mail,
            image
        };

        const response = await fetch("https://race-crud-rest-default-rtdb.firebaseio.com/users.json", {
            method: "POST",
            body: JSON.stringify(newUser)
        });
        if (response.ok) {
            reload();
        }
    }

    async function updateUser() {
        const userToUpdate = {
            name,
            title,
            mail,
            image
        };
        const response = await fetch(`https://race-crud-rest-default-rtdb.firebaseio.com/users/${user.id}.json`, {
            method: "PUT",
            body: JSON.stringify(userToUpdate)
        });
        if (response.ok) {
            reload();
        }
    }

    async function deleteUser(event) {
        event.preventDefault();
        const response = await fetch(`https://race-crud-rest-default-rtdb.firebaseio.com/users/${user.id}.json`, {
            method: "DELETE"
        });
        if (response.ok) {
            reload();
        }
    }

    return (
        <form onSubmit={saveUser}>
            {user.id ? <h2>Update User</h2> : <h2>Create User</h2>}

            <input type="text" value={name} placeholder="Type a name" onChange={e => setName(e.target.value)} />
            <input type="text" value={title} placeholder="Type a title" onChange={e => setTitle(e.target.value)} />
            <input type="mail" value={mail} placeholder="Type a mail" onChange={e => setMail(e.target.value)} />
            <input type="url" value={image} placeholder="Paste image url" onChange={e => setImage(e.target.value)} />
            {image && <img className="image-preview" src={image} alt="Choose" />}
            <button>Save</button>

            {user.id && (
                <button type="button" className="btn-outline" onClick={deleteUser}>
                    Delete
                </button>
            )}
        </form>
    );
}
