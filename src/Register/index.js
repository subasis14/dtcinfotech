import React from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetchIstance } from "../hooks/useFetchInstance";

export const Register = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const { error, ApiCall } = useFetchIstance();

  const handleChange = (e) => {
    setErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username) {
      validationErrors.username = "Please enter a username";
    }
    if (!formData.email) {
      validationErrors.email = "Please enter an email";
    }
    if (!formData.password) {
      validationErrors.password = "Please enter a password";
    }
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Please enter a confirmation password";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      ApiCall("http://localhost:4200/users", "post", data);

      !error && navigate("/login");
    }
  };

  const isEnabled =
    !formData.username ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword;

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4">Register</Typography>
        {Object.keys(errors).length > 0 && (
          <Typography sx={{ color: "red" }}>
            Please fix the following errors:
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Username"
                name="username"
                required
                error={!!errors.username}
                helperText={errors.username}
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isEnabled}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
