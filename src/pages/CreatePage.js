import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";

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

    /**
     * handleImageChange is called every time the user chooses an image in the fire system.
     * The event is fired by the input file field in the form
     */
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
            // image file size must be below 0,5MB
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            // if not below 0.5MB display an error message using the errorMessage state
            console.log("The image file is too big!");
        }
    }

    return (
        <section className="page">
            <h1>Create New User</h1>
            <form onSubmit={createUser}>
                <input type="text" value={name} placeholder="Type a name" onChange={e => setName(e.target.value)} />
                <input type="text" value={title} placeholder="Type a title" onChange={e => setTitle(e.target.value)} />
                <input type="mail" value={mail} placeholder="Type a mail" onChange={e => setMail(e.target.value)} />
                <label>
                    <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
                    <img className="image-preview" src={image} alt="Choose" onError={event => (event.target.src = imgPlaceholder)} />
                </label>
                <button>Save</button>
            </form>
        </section>
    );
}
