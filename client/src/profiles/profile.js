import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import MainData from "./MainData";

const Profile = () => {
  const data = useParams();
  console.log(data);

  return <MainData post={data} />;
};

export default Profile;
