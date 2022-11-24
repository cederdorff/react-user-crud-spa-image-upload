import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [mail, setMail] = useState("");
    const [image, setImage] = useState("");

    async function createUser(event) {
        event.preventDefault();

        const newUser = {
            // key/name: value from state
            name: name,
            title: title,
            mail: mail,
            image: image
        };

        const response = await fetch("https://race-crud-rest-default-rtdb.firebaseio.com/users.json", {
            method: "POST",
            body: JSON.stringify(newUser)
        });
        if (response.ok) {
            navigate("/");
        }
    }

    return (
        <section className="page">
            <h1>Create New User</h1>
            <form onSubmit={createUser}>
                <input type="text" value={name} placeholder="Type a name" onChange={e => setName(e.target.value)} />
                <input type="text" value={title} placeholder="Type a title" onChange={e => setTitle(e.target.value)} />
                <input type="mail" value={mail} placeholder="Type a mail" onChange={e => setMail(e.target.value)} />
                <input type="url" value={image} placeholder="Paste image url" onChange={e => setImage(e.target.value)} />
                {image && <img className="image-preview" src={image} alt="Choose" />}
                <button>Save</button>
            </form>
        </section>
    );
}
