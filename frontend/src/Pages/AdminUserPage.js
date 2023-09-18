import React from "react";
import { useParams } from "react-router-dom";

const AdminUserPage = () => {
  const { adminId } = useParams();
  return <div style={{ color: "white" }}>AdminId : {adminId}</div>;
};

export default AdminUserPage;
