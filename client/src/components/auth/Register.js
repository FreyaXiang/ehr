import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      role: "",
      birth: "",
      gender: "",
      height: "",
      weight: "",
      address: "",
      identityCardNo: "",
      org: "",
      workId: "",
      isPatient: false,
      isStaff: false,
      errors: {},
    };
    this.displayPatient = this.displayPatient.bind(this);
    this.displayStaff = this.displayStaff.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  displayPatient() {
    this.setState({
      isPatient: true,
      isStaff: false,
    });
  }

  displayStaff() {
    this.setState({
      isPatient: false,
      isStaff: true,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role,
      birth: this.state.birth,
      gender: this.state.gender,
      height: this.state.height,
      weight: this.state.weight,
      address: this.state.address,
      identityCardNo: this.state.identityCardNo,
      org: this.state.org,
      workdId: this.state.workId,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div
                className="input-field col s12"
                style={{ textAlign: "left" }}
              >
                <p>Please select your role</p>
                <p>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      onChange={this.onChange}
                      value="patient"
                      error={errors.role}
                      id="role"
                      className={classnames("", {
                        invalid: errors.role,
                      })}
                      onClick={this.displayPatient}
                    />
                    <span>Patient</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      onChange={this.onChange}
                      value="staff"
                      error={errors.role}
                      id="role"
                      className={classnames("", {
                        invalid: errors.role,
                      })}
                      onClick={this.displayStaff}
                    />
                    <span>Doctor</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      onChange={this.onChange}
                      value="staff_low"
                      error={errors.role}
                      id="role"
                      className={classnames("", {
                        invalid: errors.role,
                      })}
                      onClick={this.displayStaff}
                    />
                    <span>Staff</span>
                  </label>
                </p>
                <span className="red-text">{errors.role}</span>
              </div>

              {/* only for patient */}
              {this.state.isPatient && (
                <div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.address}
                      id="address"
                      type="text"
                    />
                    <label htmlFor="password2">Address</label>
                  </div>
                  <div
                    className="input-field col s12"
                    style={{ textAlign: "left" }}
                  >
                    <p>Please select your gender</p>
                    <p>
                      <label>
                        <input
                          name="group2"
                          type="radio"
                          onChange={this.onChange}
                          value="male"
                          id="gender"
                        />
                        <span>Male</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input
                          name="group2"
                          type="radio"
                          onChange={this.onChange}
                          value="female"
                          id="gender"
                        />
                        <span>Female</span>
                      </label>
                    </p>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.height}
                      id="height"
                      type="text"
                    />
                    <label htmlFor="height">Height(cm)</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.weight}
                      id="weight"
                      type="text"
                    />
                    <label htmlFor="weight">Weight(kg)</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.birth}
                      id="birth"
                      type="text"
                    />
                    <label htmlFor="password2">Birthday(MM/DD/YYYY)</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.identityCardNo}
                      id="identityCardNo"
                      type="text"
                    />
                    <label htmlFor="password2">Identity Card Number</label>
                  </div>
                </div>
              )}

              {this.state.isStaff && (
                <div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.org}
                      id="org"
                      type="text"
                    />
                    <label htmlFor="org">Your Organization</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.workdId}
                      id="workId"
                      type="text"
                    />
                    <label htmlFor="workId">Your working ID</label>
                  </div>
                </div>
              )}
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
