import React from "react";

const Loader = ({ loading, searchTerm }) => {
  return (
    <>
      {loading && (
        <div className="preloader-wrapper active" style={{ marginTop: "20%" }}>
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
