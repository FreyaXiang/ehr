import React, { useState, useEffect } from "react";
import axios from "axios";
import DrugSearchForm from "./DrugSearchForm";
import Loader from "./Loader";
import DrugList from "./DrugList";
import jwt_decode from "jwt-decode";
import AddDrugsModal from "./AddDrugsModal";

const Drugs = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading1, setLoading1] = useState(true);

  // fecth data from api
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.jwtToken;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      const url = "/api/users/dashboard/" + decoded.id;
      const res = await axios.get(url);
      const data = await res.data;
      setUserInfo(data);
      setLoading1(false);
      return data;
    }
    var data = fetchData();
    // setLoading(false);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [drugs, setdrugs] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchdrugs = async () => {
    setLoading(true);
    setError(false);
    try {
      const API_BASE_URL = `/api/users/findDrugs/` + searchTerm;
      const result = await axios.get(API_BASE_URL);
      setdrugs(result.data);
      console.log(result.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchdrugs();
  };

  return (
    <div>
      <div className="page-container">
        {loading1 ? (
          <Loader loading={loading1} />
        ) : (
          <div>
            <div className="title-container">
              <h4>
                {userInfo.role === "staff_low" ? "Add Drugs" : "Find Drugs"}
              </h4>
              {userInfo.role === "staff_low" && (
                <a
                  className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
                  href="#modal6"
                >
                  <i className="material-icons">add</i>
                </a>
              )}
            </div>
            {userInfo.role === "staff_low" ? (
              <div></div>
            ) : (
              <div>
                <DrugSearchForm
                  onSubmitHandler={onSubmitHandler}
                  onInputChange={onInputChange}
                  searchTerm={searchTerm}
                  error={error}
                />
                <Loader searchTerm={searchTerm} loading={loading} />
                <DrugList drugs={drugs} />
              </div>
            )}
          </div>
        )}
      </div>
      <AddDrugsModal />
    </div>
  );
};

export default Drugs;
