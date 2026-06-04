import { Card } from "antd";
import { getUser } from "../../utils/auth";

const Profile = () => {
  const user = getUser();

  if (!user) {
    return <h2>Please login first</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <Card
        title="My Profile"
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "skyblue",
        }}
      >
        <p>
          <strong>Volunteer ID:</strong> {user.volunteer_id}
        </p>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        <p>
          <strong>Location:</strong> {user.location}
        </p>

        <p>
          <strong>Skills:</strong> {user.skills}
        </p>

        <p>
          <strong>Availability:</strong> {user.availability}
        </p>

        <p>
          <strong>Verified:</strong>{" "}
          {user.is_verified ? "Yes" : "No"}
        </p>
      </Card>
    </div>
  );
};

export default Profile;