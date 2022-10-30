import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import * as UserApi from "../../api/UserRequest.js";
import CommonSection from "../../components/UI/CommonSection";

import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.scss";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";

import { updateUser } from "../../actions/userAction";
// import user_icon from "../../assets/images/user-icon.png";
import user_icon from "../../assets/images/user-icon.png";

const Profile = () => {
  const user = useSelector((state) => state.auth.authData);
  const [profile, setProfile] = useState(user?.user);
  const [isLodaing, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfileUser = async () => {
      const profileUser = await UserApi.getUser(user.user._id);
      setProfile(profileUser.data);
    };

    if (user) {
      fetchProfileUser();
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const upLoadImage = async (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoading(false);
          setProfile({
            ...profile,
            profileImage: downloadURL,
          });
        });
      }
    );
  };

  const dispatch = useDispatch();
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(profile);
    dispatch(updateUser(user.user._id, profile));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="profile">
      <CommonSection title="Profile" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="3" className="box-image">
              {isLodaing ? (
                <span>Loading...</span>
              ) : (
                <img
                  src={
                    profile?.profileImage ? profile?.profileImage : user_icon
                  }
                  alt="iconUser"
                  className="imageUser"
                />
              )}

              <input
                type="file"
                name="file"
                id="file"
                className="inputfile"
                onChange={upLoadImage}
              />
              <label htmlFor="file">Update Image</label>
            </Col>
            <Col lg="9" md="6">
              <h1 className="text-center">Information</h1>
              <form className="form">
                <div className="form__group">
                  <span>User name</span>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={profile.username}
                  />
                </div>
                <div className="form__group">
                  <span>Phone number</span>

                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    value={profile.phone}
                  />
                </div>
                <div className="form__group">
                  <span>Street address</span>

                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={profile.address}
                  />
                </div>
                <div className="form__group">
                  <span>City</span>

                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    value={profile.city}
                  />
                </div>
                {/* <div className="form__group">
                  <span>Postal code</span>

                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={profile.address}
                  />
                </div> */}
                <div className="form__group">
                  <span>Country</span>

                  <input
                    type="text"
                    name="country"
                    onChange={handleChange}
                    value={profile.country}
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="button"
                  onClick={handleUpdate}
                >
                  Save
                </motion.button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Profile;
