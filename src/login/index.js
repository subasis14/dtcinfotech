import React, { useEffect } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import { useFetchIstance } from "../hooks/useFetchInstance";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const { data, error, ApiCall } = useFetchIstance();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: formData.email,
      password: formData.password,
    };
    ApiCall("http://localhost:4200/login", "post", loginData);
  };

  useEffect(() => {
    data && navigate("/datagrid");
  }, [data]);

  const isEnabled = !formData.email || !formData.password;

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4">Login</Typography>
        {error && (
          <Typography sx={{ color: "red" }}>Invalid Credentials</Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
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
