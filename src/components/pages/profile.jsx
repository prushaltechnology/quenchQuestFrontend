// Import Card component from Ant Design
import { Card } from "antd";

// Import function that reads user data from localStorage
import { getUser } from "../../utils/auth";

// Create Profile component
const Profile = () => {

  // Get logged-in user data from localStorage
  const user = getUser();

  // If no user is found, show this message
  if (!user) {
    return <h2>Please login first</h2>;
  }

  // If user exists, show profile page
  return (

    // Outer container with padding around profile card
    <div style={{ padding: "40px", }}>

      {/* Ant Design Card component */}
      <Card
        title="My Profile"
        style={{ maxWidth: 700, marginLeft: "400px", backgroundColor: "skyblue" }}
        
      >

        {/* Display database ID */}
        <p>
          {/* <strong>ID:</strong> {user.id} */}
        </p>

        {/* Display Volunteer ID */}
        <p>
          <strong>Volunteer ID:</strong> {user.volunteer_id}
        </p>

        {/* Display User Name */}
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        {/* Display User Email */}
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        {/* Display User Phone Number */}
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        {/* Display User Location */}
        <p>
          <strong>Location:</strong> {user.location}
        </p>

        {/* Display User Skills */}
        <p>
          <strong>Skills:</strong> {user.skills}
        </p>

        {/* Display User Availability */}
        <p>
          <strong>Availability:</strong> {user.availability}
        </p>

        {/* Check if user is verified */}
        <p>

          {/* Label */}
          <strong>Verified:</strong>{" "}

          {/* 
            If is_verified = true
            show "Yes"

            If is_verified = false
            show "No"
          */}
          {user.is_verified ? "Yes" : "No"}

        </p>

      </Card>

    </div>
  );
};

// Export component so it can be used in App.jsx routes
export default Profile;