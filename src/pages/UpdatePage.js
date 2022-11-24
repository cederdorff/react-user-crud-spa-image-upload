import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePage() {
    const params = useParams();
    const url = `https://race-crud-rest-default-rtdb.firebaseio.com/users/${params.id}.json`;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [mail, setMail] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        async function getUser() {
            const response = await fetch(url); // read one user from firebase
            const user = await response.json();
            setName(user.name);
            setTitle(user.title);
            setMail(user.mail);
            setImage(user.image);
        }
        getUser();
    }, [url]); // <--- "[]" VERY IMPORTANT!!!

    async function updateUser(event) {
        event.preventDefault();

        const userToUpdate = {
            // key/name: value from state
            name: name,
            title: title,
            mail: mail,
            image: image
        };

        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(userToUpdate)
        });
        if (response.ok) {
            navigate("/");
        }
    }

    return (
        <section className="page">
            <h1>Update "{name}"</h1>
            <form onSubmit={updateUser}>
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
