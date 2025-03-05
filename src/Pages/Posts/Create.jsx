import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function Create() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    content: "",
    // title: "",
    // body: "",
  });

  console.log("formData", formData);

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/posts`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }
  return (
    <>
      <h1 className="title">Create a new post</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        {/* <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div> */}

        <div>
          <textarea
            rows="6"
            placeholder="Post Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          ></textarea>
          {errors.content && <p className="error">{errors.content[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
    </>
  );
}
