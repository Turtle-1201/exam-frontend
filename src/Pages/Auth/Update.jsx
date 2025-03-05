import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [post, setPost] = useState(null);

  async function getPost() {
    const res = await fetch(`${API_URL}/api/show-user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user");
      return;
    }

    const data = await res.json();
    console.log("Fetched User Data:", data);

    if (data.user) {
      setPost(data.user);
      setFormData({ name: data.user.name, email: data.user.email });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/update-user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Update Response:", data);

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1 className="title">Update your Profile</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>

        <button className="primary-btn">Update</button>
      </form>
    </>
  );
}
